"""Legacy route must never reach the LLM without an authenticated session."""
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_legacy_route_returns_gone() -> None:
    response = client.post("/api/v1/chat/messages", json={"message": "Flooring advice"})
    assert response.status_code == 410


def test_chat_rejects_whitespace_only_message() -> None:
    # Whitespace is syntactically valid but no longer reaches the LLM.
    response = client.post("/api/v1/chat/messages", json={"message": "   "})
    assert response.status_code == 410


def test_chat_rejects_non_string_message() -> None:
    response = client.post("/api/v1/chat/messages", json={"message": ["hello"]})
    assert response.status_code == 422
