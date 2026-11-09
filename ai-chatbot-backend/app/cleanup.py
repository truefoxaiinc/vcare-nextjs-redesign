"""Run explicitly as a scheduled one-shot job; never at API startup."""
import asyncio
from datetime import UTC, datetime, timedelta

from sqlalchemy import delete, select

from app.core.config import get_settings
from app.storage import Conversation, Turn, session_factory


async def purge_expired() -> int:
    settings = get_settings()
    cutoff = datetime.now(UTC) - timedelta(seconds=settings.expired_session_grace_seconds)
    async with session_factory()() as db:
        expired = select(Conversation.id).where(Conversation.expires_at < cutoff)
        await db.execute(delete(Turn).where(Turn.conversation_id.in_(expired)))
        result = await db.execute(delete(Conversation).where(Conversation.expires_at < cutoff))
        await db.commit()
        return result.rowcount or 0


if __name__ == "__main__":
    print(asyncio.run(purge_expired()))
