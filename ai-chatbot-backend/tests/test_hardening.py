"""Security regression tests using the existing isolated test fixture."""
import asyncio

from fastapi import HTTPException

from app.locks import conversation_lock
from app.security import hash_token, issue_token


class LockRedis:
    def __init__(self):
        self.values = {}

    async def set(self, key, value, nx=False, ex=None):
        if nx and key in self.values:
            return None
        self.values[key] = value
        return True

    async def eval(self, script, keys_count, key, owner):
        if self.values.get(key) == owner:
            del self.values[key]
            return 1
        return 0


def test_lock_prevents_overlapping_turns():
    async def check():
        redis = LockRedis()
        async with conversation_lock(redis, "session-1", 40):
            try:
                async with conversation_lock(redis, "session-1", 40):
                    raise AssertionError("Concurrent call unexpectedly acquired lock")
            except HTTPException as exc:
                assert exc.status_code == 409
        assert redis.values == {}
        async with conversation_lock(redis, "session-1", 40):
            pass

    asyncio.run(check())


def test_lock_is_scoped_to_session():
    async def check():
        redis = LockRedis()
        async with conversation_lock(redis, "a", 40), conversation_lock(redis, "b", 40):
            assert len(redis.values) == 2

    asyncio.run(check())


def test_tokens_are_opaque_and_hashes_stable():
    a, b = issue_token(), issue_token()
    assert a != b
    assert len(a) >= 32
    assert hash_token(a) == hash_token(a)
    assert hash_token(a) != a
