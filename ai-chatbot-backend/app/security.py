"""Opaque bearer credentials and fail-closed distributed throttling."""
import hashlib
import secrets
from datetime import UTC, datetime, timedelta

from fastapi import HTTPException
from redis.asyncio import Redis
from redis.exceptions import RedisError
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import Settings
from app.storage import Conversation

RATE_SCRIPT = """
local current = redis.call('INCR', KEYS[1])
if current == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return current
"""


def issue_token() -> str:
    return secrets.token_urlsafe(32)


def hash_token(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def expiry(settings: Settings) -> datetime:
    return datetime.now(UTC) + timedelta(seconds=settings.session_ttl_seconds)


async def authenticate(db: AsyncSession, bearer: str | None) -> Conversation:
    if not bearer or not bearer.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Session credential required")
    token = bearer[7:]
    if len(token) > 256 or len(token) < 32:
        raise HTTPException(status_code=401, detail="Invalid session credential")
    conversation = await db.scalar(
        select(Conversation).where(Conversation.token_hash == hash_token(token))
    )
    if conversation is None:
        raise HTTPException(status_code=401, detail="Invalid session credential")
    expires = conversation.expires_at
    if expires.tzinfo is None:
        expires = expires.replace(tzinfo=UTC)
    if expires <= datetime.now(UTC):
        raise HTTPException(status_code=401, detail="Session expired")
    return conversation


async def throttle(redis: Redis, key: str, limit: int, window: int) -> None:
    try:
        count = await redis.eval(RATE_SCRIPT, 1, key, window)
    except RedisError as exc:
        raise HTTPException(status_code=503, detail="Chat service temporarily unavailable") from exc
    if count > limit:
        raise HTTPException(status_code=429, detail="Too many requests")
