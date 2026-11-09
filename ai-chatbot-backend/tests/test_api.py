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


def test_legacy_chat_disabled_without_provider_call() -> None:
    response = client.post("/api/v1/chat/messages", json={"message": "Hello"})
    assert response.status_code == 410
    assert "Legacy chat disabled" in response.json()["detail"]
