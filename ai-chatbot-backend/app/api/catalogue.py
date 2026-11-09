"""Authenticated read-only catalogue search; never exposes draft inventory."""
from typing import Annotated

from fastapi import APIRouter, Depends, Header, HTTPException, Query, Request
from pydantic import BaseModel, Field
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.sessions import ip_key
from app.core.config import Settings, get_settings
from app.knowledge.catalogue import load_snapshot, search
from app.limits import get_redis
from app.security import authenticate, throttle
from app.storage import get_db

router = APIRouter(prefix="/api/v1/chat/sessions", tags=["catalogue"])
Db = Annotated[AsyncSession, Depends(get_db)]
Cache = Annotated[Redis, Depends(get_redis)]
Config = Annotated[Settings, Depends(get_settings)]
Auth = Annotated[str | None, Header(alias="Authorization")]


class ProductHit(BaseModel):
    slug: str
    name: str
    category: str
    supplier: str
    description: str
    canonical_url: str


class SearchOut(BaseModel):
    results: list[ProductHit] = Field(default_factory=list)
    source_commit: str | None = None


@router.get("/{session_id}/catalogue", response_model=SearchOut)
async def search_catalogue(
    session_id: str, request: Request, db: Db, redis: Cache, settings: Config,
    q: Annotated[str, Query(min_length=2, max_length=120)],
    authorization: Auth = None,
) -> SearchOut:
    conversation = await authenticate(db, authorization)
    if conversation.id != session_id:
        raise HTTPException(status_code=403, detail="Session access denied")
    await throttle(redis, ip_key(request), settings.ip_rate_limit, 60)
    await throttle(redis, "vcare:session:" + session_id, settings.session_rate_limit, 60)
    if not settings.catalogue_snapshot_path or not settings.catalogue_snapshot_sha256:
        return SearchOut()
    try:
        snapshot = load_snapshot(
            settings.catalogue_snapshot_path, settings.catalogue_snapshot_sha256,
        )
    except (ValueError, OSError, UnicodeError):
        # Never leak an unreviewed or stale catalogue.
        raise HTTPException(status_code=503, detail="Catalogue temporarily unavailable") from None
    return SearchOut(
        source_commit=snapshot.source_commit,
        results=[ProductHit.model_validate(item.model_dump()) for item in search(snapshot, q)],
    )
