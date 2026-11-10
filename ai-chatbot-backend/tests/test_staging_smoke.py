"""Offline tests for the explicitly opted-in staging smoke workflow."""
import importlib.util
from pathlib import Path
from urllib.error import HTTPError

import pytest

MODULE = Path(__file__).resolve().parents[1] / "scripts" / "staging_smoke.py"
spec = importlib.util.spec_from_file_location("staging_smoke", MODULE)
smoke_module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(smoke_module)


def test_staging_origin_requires_explicit_confirmation(monkeypatch):
    monkeypatch.setenv("CHATBOT_STAGING_ORIGIN", "https://staging.example.com")
    monkeypatch.setenv("CHATBOT_STAGING_ALLOWED_ORIGIN", "https://staging.example.com")
    monkeypatch.delenv("CHATBOT_STAGING_CONFIRM", raising=False)
    with pytest.raises(ValueError, match="CONFIRM"):
        smoke_module.origin_from_env()


@pytest.mark.parametrize("origin", [
    "http://staging.example.com", "https://localhost", "https://user:pass@staging.example.com",
    "https://staging.example.com/other", "https://staging.example.com?key=secret",
])
def test_rejects_unsafe_staging_origins(monkeypatch, origin):
    monkeypatch.setenv("CHATBOT_STAGING_CONFIRM", "yes")
    monkeypatch.setenv("CHATBOT_STAGING_ORIGIN", origin)
    monkeypatch.setenv("CHATBOT_STAGING_ALLOWED_ORIGIN", origin)
    with pytest.raises(ValueError):
        smoke_module.origin_from_env()


def test_smoke_creates_sends_and_deletes(monkeypatch):
    calls = []

    def fake_request(origin, path, method, token="", payload=None):
        calls.append((method, path, token))
        if method == "POST" and path.endswith("/sessions"):
            return 201, {"session_id": "session-1", "token": "secret"}
        if method == "POST":
            assert payload == {"message": "Hello"}
            return 200, {"session_id": "session-1", "reply": "Welcome!"}
        if method == "GET":
            raise HTTPError(origin + path, 401, "Unauthorized", {}, None)
        return 204, None

    monkeypatch.setattr(smoke_module, "request", fake_request)
    smoke_module.smoke("https://staging.example.com")
    assert [call[0] for call in calls] == ["POST", "POST", "DELETE", "GET"]


def test_smoke_deletes_session_even_when_ai_fails(monkeypatch):
    calls = []

    def fake_request(origin, path, method, token="", payload=None):
        calls.append(method)
        if method == "POST" and path.endswith("/sessions"):
            return 201, {"session_id": "session-1", "token": "secret"}
        if method == "POST":
            raise RuntimeError("Provider unavailable")
        if method == "GET":
            raise HTTPError(origin + path, 401, "Unauthorized", {}, None)
        return 204, None

    monkeypatch.setattr(smoke_module, "request", fake_request)
    with pytest.raises(RuntimeError, match="Provider unavailable"):
        smoke_module.smoke("https://staging.example.com")
    assert calls == ["POST", "POST", "DELETE", "GET"]

def test_staging_origin_must_match_independent_allowlist(monkeypatch):
    monkeypatch.setenv("CHATBOT_STAGING_CONFIRM", "yes")
    monkeypatch.setenv("CHATBOT_STAGING_ORIGIN", "https://production.example.com")
    monkeypatch.setenv("CHATBOT_STAGING_ALLOWED_ORIGIN", "https://staging.example.com")
    with pytest.raises(ValueError, match="ALLOWED_ORIGIN"):
        smoke_module.origin_from_env()


def test_staging_origin_accepts_exact_allowlisted_https_target(monkeypatch):
    monkeypatch.setenv("CHATBOT_STAGING_CONFIRM", "yes")
    monkeypatch.setenv("CHATBOT_STAGING_ORIGIN", "https://staging.example.com")
    monkeypatch.setenv("CHATBOT_STAGING_ALLOWED_ORIGIN", "https://staging.example.com")
    assert smoke_module.origin_from_env() == "https://staging.example.com"


def test_redirects_are_rejected_to_protect_bearer_credentials():
    handler = smoke_module.NoRedirects()
    assert handler.redirect_request(None, None, 302, "Found", {}, "https://other.example") is None


@pytest.mark.parametrize("revocation_status", [200, 403, 404, 500])
def test_smoke_rejects_unverified_token_revocation(monkeypatch, revocation_status):
    calls = []

    def fake_request(origin, path, method, token="", payload=None):
        calls.append(method)
        if method == "POST" and path.endswith("/sessions"):
            return 201, {"session_id": "session-1", "token": "secret"}
        if method == "POST":
            return 200, {"session_id": "session-1", "reply": "Welcome!"}
        if method == "DELETE":
            return 204, None
        if revocation_status == 200:
            return 200, {"messages": []}
        raise HTTPError(origin + path, revocation_status, "Unexpected", {}, None)

    monkeypatch.setattr(smoke_module, "request", fake_request)
    with pytest.raises(RuntimeError, match="Staging session cleanup failed"):
        smoke_module.smoke("https://staging.example.com")
    assert calls == ["POST", "POST", "DELETE", "GET"]
