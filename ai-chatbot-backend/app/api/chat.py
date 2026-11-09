from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field

from app.agent.sales import answer
from app.core.config import Settings, get_settings
from app.llm.openrouter import ProviderUnavailable

router = APIRouter(prefix="/api/v1/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    reply: str
    agent: str = "vcare-ai-sales"


@router.post("/messages", response_model=ChatResponse)
async def chat(payload: ChatRequest, settings: Annotated[Settings, Depends(get_settings)]) -> ChatResponse:
    if not payload.message.strip() or len(payload.message) > settings.max_message_length:
        raise HTTPException(status_code=422, detail="Invalid message")
    try:
        reply = await answer(payload.message, settings)
    except ProviderUnavailable as exc:
        raise HTTPException(status_code=503, detail="AI assistant temporarily unavailable") from exc
    return ChatResponse(reply=reply)
