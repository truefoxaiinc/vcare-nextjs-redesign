"""Deterministic API contract tests: no live OpenRouter credentials required."""

from fastapi.testclient import TestClient

from app.core.config import Settings, get_settings
from app.main import app

client = TestClient(app)


def test_chat_returns_mocked_provider_reply(monkeypatch) -> None:
    from app.agent import sales

    captured = {}

    async def fake_complete(messages, settings):
        captured["messages"] = messages
        return "I can help you explore flooring options. Which room is it for?"

    monkeypatch.setattr(sales, "complete", fake_complete)
    app.dependency_overrides[get_settings] = lambda: Settings(
        openrouter_api_key="test-only", _env_file=None
    )
    try:
        response = client.post("/api/v1/chat/messages", json={"message": "Flooring advice"})
        assert response.status_code == 200
        assert response.json()["agent"] == "vcare-ai-sales"
        assert "flooring options" in response.json()["reply"]
        assert captured["messages"][-1] == {
            "role": "user",
            "content": "Flooring advice",
        }
    finally:
        app.dependency_overrides.clear()


def test_chat_rejects_whitespace_only_message() -> None:
    response = client.post("/api/v1/chat/messages", json={"message": "   "})
    assert response.status_code == 422


def test_chat_rejects_non_string_message() -> None:
    response = client.post("/api/v1/chat/messages", json={"message": ["hello"]})
    assert response.status_code == 422
