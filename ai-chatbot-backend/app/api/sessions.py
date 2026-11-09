"""Authenticated, isolated, bounded conversation API."""
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, Header, HTTPException, Request
from pydantic import BaseModel, Field
from redis.asyncio import Redis
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.agent.sales import SYSTEM_PROMPT
from app.core.config import Settings, get_settings
from app.limits import get_redis
from app.locks import conversation_lock
from app.llm.openrouter import ProviderUnavailable, complete
from app.security import authenticate, expiry, hash_token, issue_token, throttle
from app.storage import Conversation, Turn, get_db

router = APIRouter(prefix="/api/v1/chat/sessions", tags=["chat-sessions"])
Db = Annotated[AsyncSession, Depends(get_db)]
Cache = Annotated[Redis, Depends(get_redis)]
Config = Annotated[Settings, Depends(get_settings)]
Auth = Annotated[str | None, Header(alias="Authorization")]


class SessionCreated(BaseModel):
    session_id: str
    token: str
    expires_at: datetime


class MessageIn(BaseModel):
    message: str = Field(min_length=1, max_length=2000)


class MessageOut(BaseModel):
    reply: str
    session_id: str


class HistoryOut(BaseModel):
    messages: list[dict[str, str]]


def ip_key(request: Request) -> str:
    # Never trust X-Forwarded-For unless a separately configured trusted proxy validates it.
    address = request.client.host if request.client else "unknown"
    return "vcare:ip:" + hash_token(address)


@router.post("", response_model=SessionCreated, status_code=201)
async def create_session(request: Request, db: Db, redis: Cache, settings: Config) -> SessionCreated:
    await throttle(redis, ip_key(request), settings.ip_rate_limit, 60)
    token = issue_token()
    conversation = Conversation(token_hash=hash_token(token), expires_at=expiry(settings))
    db.add(conversation)
    await db.commit()
    await db.refresh(conversation)
    return SessionCreated(session_id=conversation.id, token=token, expires_at=conversation.expires_at)


@router.post("/{session_id}/messages", response_model=MessageOut)
async def message(
    session_id: str, payload: MessageIn, request: Request, db: Db, redis: Cache,
    settings: Config, authorization: Auth = None,
) -> MessageOut:
    conversation = await authenticate(db, authorization)
    if conversation.id != session_id:
        raise HTTPException(status_code=403, detail="Session access denied")
    if not payload.message.strip() or len(payload.message) > settings.max_message_length:
        raise HTTPException(status_code=422, detail="Invalid message")
    await throttle(redis, ip_key(request), settings.ip_rate_limit, 60)
    await throttle(redis, "vcare:session:" + conversation.id, settings.session_rate_limit, 60)
    async with conversation_lock(redis, conversation.id, settings.message_lock_ttl_seconds):
        # Re-check authorization after acquiring the lock: the session may have expired.
        await authenticate(db, authorization)
        history = (await db.scalars(
            select(Turn).where(Turn.conversation_id == conversation.id)
            .order_by(Turn.id.desc()).limit(settings.history_turn_limit)
        )).all()
        messages = [{"role": "system", "content": SYSTEM_PROMPT}]
        messages.extend({"role": turn.role, "content": turn.content} for turn in reversed(history))
        messages.append({"role": "user", "content": payload.message})
        try:
            reply = await complete(messages, settings)
        except ProviderUnavailable as exc:
            raise HTTPException(status_code=503, detail="AI assistant temporarily unavailable") from exc
        db.add_all([
            Turn(conversation_id=conversation.id, role="user", content=payload.message),
            Turn(conversation_id=conversation.id, role="assistant", content=reply),
        ])
        await db.commit()
        return MessageOut(reply=reply, session_id=conversation.id)


@router.get("/{session_id}/messages", response_model=HistoryOut)
async def history(
    session_id: str, request: Request, db: Db, redis: Cache, settings: Config,
    authorization: Auth = None,
) -> HistoryOut:
    conversation = await authenticate(db, authorization)
    if conversation.id != session_id:
        raise HTTPException(status_code=403, detail="Session access denied")
    await throttle(redis, ip_key(request), settings.ip_rate_limit, 60)
    await throttle(redis, "vcare:session:" + session_id, settings.session_rate_limit, 60)
    turns = (await db.scalars(
        select(Turn).where(Turn.conversation_id == session_id)
        .order_by(Turn.id.desc()).limit(settings.history_turn_limit)
    )).all()
    return HistoryOut(messages=[
        {"role": turn.role, "content": turn.content} for turn in reversed(turns)
    ])


@router.delete("/{session_id}", status_code=204)
async def delete_session(
    session_id: str, request: Request, db: Db, redis: Cache, settings: Config,
    authorization: Auth = None,
) -> None:
    conversation = await authenticate(db, authorization)
    if conversation.id != session_id:
        raise HTTPException(status_code=403, detail="Session access denied")
    await throttle(redis, ip_key(request), settings.ip_rate_limit, 60)
    await throttle(redis, "vcare:session:" + session_id, settings.session_rate_limit, 60)
    async with conversation_lock(redis, session_id, settings.message_lock_ttl_seconds):
        turns = (await db.scalars(select(Turn).where(Turn.conversation_id == session_id))).all()
        for turn in turns:
            await db.delete(turn)
        await db.delete(conversation)
        await db.commit()
