"""Legacy stateless chat is deliberately disabled to prevent unauthenticated LLM spending."""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter(prefix="/api/v1/chat", tags=["chat"])


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)


class ChatResponse(BaseModel):
    reply: str
    agent: str = "vcare-ai-sales"


@router.post("/messages", response_model=ChatResponse, deprecated=True)
async def chat(payload: ChatRequest) -> ChatResponse:
    raise HTTPException(
        status_code=410,
        detail="Legacy chat disabled. Create a session at /api/v1/chat/sessions.",
    )
