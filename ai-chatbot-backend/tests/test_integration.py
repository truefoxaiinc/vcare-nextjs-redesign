"""Real PostgreSQL + Redis integration; requires CI service containers."""
import asyncio
import os
import subprocess
from datetime import UTC, datetime, timedelta

import pytest
from redis.asyncio import Redis
from sqlalchemy import select
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.security import hash_token, issue_token, throttle
from app.storage import Conversation, Turn


@pytest.mark.skipif(
    not os.getenv("CHATBOT_INTEGRATION_DATABASE_URL"),
    reason="Integration database not configured",
)
def test_postgres_migration_roundtrip_and_persistence():
    database_url = os.environ["CHATBOT_INTEGRATION_DATABASE_URL"]
    env = {**os.environ, "DATABASE_URL": database_url}
    for command in ("upgrade head", "downgrade base", "upgrade head"):
        subprocess.run(
            ["alembic", *command.split()],
            check=True, env=env, capture_output=True, text=True, timeout=45,
        )

    async def verify():
        engine = create_async_engine(database_url)
        try:
            async with async_sessionmaker(engine, expire_on_commit=False)() as db:
                token = issue_token()
                record = Conversation(
                    token_hash=hash_token(token),
                    expires_at=datetime.now(UTC) + timedelta(minutes=5),
                )
                db.add(record)
                await db.flush()
                db.add(Turn(conversation_id=record.id, role="user", content="Kitchen"))
                await db.commit()
                turns = (await db.scalars(
                    select(Turn).where(Turn.conversation_id == record.id)
                )).all()
                assert len(turns) == 1
                assert turns[0].content == "Kitchen"
                await db.delete(turns[0])
                await db.delete(record)
                await db.commit()
        finally:
            await engine.dispose()

    asyncio.run(verify())


@pytest.mark.skipif(
    not os.getenv("CHATBOT_INTEGRATION_REDIS_URL"),
    reason="Integration Redis not configured",
)
def test_real_redis_atomic_throttling():
    from fastapi import HTTPException

    async def verify():
        redis = Redis.from_url(os.environ["CHATBOT_INTEGRATION_REDIS_URL"])
        key = "vcare:integration:" + issue_token()
        try:
            await throttle(redis, key, 2, 30)
            await throttle(redis, key, 2, 30)
            with pytest.raises(HTTPException) as error:
                await throttle(redis, key, 2, 30)
            assert error.value.status_code == 429
            assert await redis.ttl(key) > 0
        finally:
            await redis.delete(key)
            await redis.aclose()

    asyncio.run(verify())
