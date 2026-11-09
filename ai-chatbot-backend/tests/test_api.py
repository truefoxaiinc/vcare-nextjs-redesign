from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_empty_message_rejected() -> None:
    assert client.post("/api/v1/chat/messages", json={"message": ""}).status_code == 422


def test_long_message_rejected() -> None:
    assert client.post("/api/v1/chat/messages", json={"message": "x" * 2001}).status_code == 422


def test_missing_provider_key_returns_safe_error(monkeypatch) -> None:
    from app.core.config import Settings, get_settings

    app.dependency_overrides[get_settings] = lambda: Settings(openrouter_api_key="", _env_file=None)
    try:
        response = client.post("/api/v1/chat/messages", json={"message": "Hello"})
        assert response.status_code == 503
        assert "temporarily unavailable" in response.json()["detail"]
    finally:
        app.dependency_overrides.clear()
