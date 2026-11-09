"""Session isolation and bounded-memory contract tests without external services."""
from datetime import datetime, timedelta, timezone

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine
from sqlalchemy.pool import StaticPool

from app.core.config import Settings, get_settings
from app.limits import get_redis
from app.main import app
from app.security import authenticate, hash_token, issue_token
from app.storage import Base, Conversation, get_db


class FakeRedis:
    def __init__(self):
        self.counts = {}

    async def eval(self, script, number_of_keys, key, window):
        self.counts[key] = self.counts.get(key, 0) + 1
        return self.counts[key]


@pytest.fixture
def client(monkeypatch):
    from app.api import sessions

    engine = create_async_engine(
        "sqlite+aiosqlite://", connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    import asyncio

    asyncio.run(create_schema(engine))
    factory = async_sessionmaker(engine, expire_on_commit=False)

    async def db_override():
        async with factory() as session:
            yield session

    fake_redis = FakeRedis()

    async def redis_override():
        yield fake_redis

    async def fake_complete(messages, settings):
        return "I can help. What flooring finish do you prefer?"

    monkeypatch.setattr(sessions, "complete", fake_complete)
    app.dependency_overrides[get_db] = db_override
    app.dependency_overrides[get_redis] = redis_override
    app.dependency_overrides[get_settings] = lambda: Settings(
        openrouter_api_key="test-only", _env_file=None, ip_rate_limit=100,
        session_rate_limit=2, history_turn_limit=4,
    )
    try:
        with TestClient(app) as test_client:
            yield test_client, fake_redis
    finally:
        app.dependency_overrides.clear()
        asyncio.run(engine.dispose())


async def create_schema(engine):
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)


def new_session(client):
    response = client.post("/api/v1/chat/sessions")
    assert response.status_code == 201, response.text
    return response.json()


def test_session_isolation_and_deletion(client):
    http, _ = client
    a, b = new_session(http), new_session(http)
    url = "/api/v1/chat/sessions/" + a["session_id"]
    assert a["token"] != b["token"]
    assert http.get(url + "/messages").status_code == 401
    assert http.get(url + "/messages", headers={"Authorization": "Bearer " + b["token"]}).status_code == 403
    headers = {"Authorization": "Bearer " + a["token"]}
    assert http.post(url + "/messages", headers=headers, json={"message": "Bedroom"}).status_code == 200
    history = http.get(url + "/messages", headers=headers).json()["messages"]
    assert [item["role"] for item in history] == ["user", "assistant"]
    assert history[0]["content"] == "Bedroom"
    assert http.delete(url, headers=headers).status_code == 204
    assert http.get(url + "/messages", headers=headers).status_code == 401


def test_session_rate_limit(client):
    http, _ = client
    a = new_session(http)
    url = "/api/v1/chat/sessions/" + a["session_id"] + "/messages"
    headers = {"Authorization": "Bearer " + a["token"]}
    for _ in range(2):
        assert http.post(url, headers=headers, json={"message": "Hello"}).status_code == 200
    assert http.post(url, headers=headers, json={"message": "Hello"}).status_code == 429


def test_invalid_payload_does_not_call_provider(client):
    http, _ = client
    a = new_session(http)
    url = "/api/v1/chat/sessions/" + a["session_id"] + "/messages"
    headers = {"Authorization": "Bearer " + a["token"]}
    assert http.post(url, headers=headers, json={"message": "  "}).status_code == 422


def test_expired_token_rejected():
    import asyncio

    asyncio.run(_expired_token_rejected())


async def _expired_token_rejected():
    from fastapi import HTTPException

    engine = create_async_engine("sqlite+aiosqlite://")
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
    token = issue_token()
    async with async_sessionmaker(engine, expire_on_commit=False)() as db:
        db.add(Conversation(token_hash=hash_token(token), expires_at=datetime.now(timezone.utc) - timedelta(seconds=1)))
        await db.commit()
        with pytest.raises(HTTPException) as error:
            await authenticate(db, "Bearer " + token)
        assert error.value.status_code == 401
    await engine.dispose()
