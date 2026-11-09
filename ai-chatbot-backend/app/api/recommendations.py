"""Authenticated, read-only, source-backed recommendation cards."""
from typing import Annotated

from fastapi import APIRouter, Depends, Header, HTTPException, Query, Request
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.sessions import ip_key
from app.core.config import Settings, get_settings
from app.knowledge.catalogue import load_snapshot
from app.knowledge.recommendations import RecommendationOut, recommend
from app.limits import get_redis
from app.security import authenticate, throttle
from app.storage import get_db

router = APIRouter(prefix="/api/v1/chat/sessions", tags=["recommendations"])
Db = Annotated[AsyncSession, Depends(get_db)]
Cache = Annotated[Redis, Depends(get_redis)]
Config = Annotated[Settings, Depends(get_settings)]
Auth = Annotated[str | None, Header(alias="Authorization")]


@router.get("/{session_id}/recommendations", response_model=RecommendationOut)
async def recommendations(
    session_id: str, request: Request, db: Db, redis: Cache, settings: Config,
    q: Annotated[str, Query(min_length=2, max_length=120)],
    authorization: Auth = None,
) -> RecommendationOut:
    conversation = await authenticate(db, authorization)
    if conversation.id != session_id:
        raise HTTPException(status_code=403, detail="Session access denied")
    await throttle(redis, ip_key(request), settings.ip_rate_limit, 60)
    await throttle(redis, "vcare:session:" + session_id, settings.session_rate_limit, 60)
    if not settings.catalogue_snapshot_path or not settings.catalogue_snapshot_sha256:
        return RecommendationOut()
    try:
        snapshot = load_snapshot(
            settings.catalogue_snapshot_path, settings.catalogue_snapshot_sha256,
        )
    except (ValueError, OSError, UnicodeError):
        raise HTTPException(status_code=503, detail="Catalogue temporarily unavailable") from None
    return recommend(snapshot, q)
