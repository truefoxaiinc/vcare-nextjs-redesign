"""Redis distributed single-flight lock for a conversation.

Release is compare-and-delete so an expired lock cannot delete a successor's lock.
"""
from contextlib import asynccontextmanager
from typing import AsyncIterator

from fastapi import HTTPException
from redis.asyncio import Redis
from redis.exceptions import RedisError

from app.security import issue_token

UNLOCK_SCRIPT = """
if redis.call('GET', KEYS[1]) == ARGV[1] then
  return redis.call('DEL', KEYS[1])
end
return 0
"""


@asynccontextmanager
async def conversation_lock(redis: Redis, session_id: str, ttl: int) -> AsyncIterator[None]:
    key = "vcare:lock:" + session_id
    owner = issue_token()
    try:
        acquired = await redis.set(key, owner, nx=True, ex=ttl)
    except RedisError as exc:
        raise HTTPException(status_code=503, detail="Chat service temporarily unavailable") from exc
    if not acquired:
        raise HTTPException(status_code=409, detail="Another message is processing")
    try:
        yield
    finally:
        try:
            await redis.eval(UNLOCK_SCRIPT, 1, key, owner)
        except RedisError:
            # Expiry bounds stale locks; never mask an already completed reply.
            pass
