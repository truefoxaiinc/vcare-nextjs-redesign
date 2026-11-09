from fastapi import FastAPI

from app.api.catalogue import router as catalogue_router
from app.api.chat import router as chat_router
from app.api.sessions import router as sessions_router
from app.api.recommendations import router as recommendations_router

app = FastAPI(title="V CARE AI Sales Agent", version="0.2.0")
app.include_router(chat_router)
app.include_router(sessions_router)
app.include_router(catalogue_router)
app.include_router(recommendations_router)


@app.get("/health", tags=["health"])
def health() -> dict[str, str]:
    return {"status": "ok"}
