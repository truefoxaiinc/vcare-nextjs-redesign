"""Opt-in staging smoke check. Never run against production.

Usage:
  CHATBOT_STAGING_ORIGIN=https://staging.example.com \
    python scripts/staging_smoke.py

The script creates a temporary session, asks a greeting, and deletes the
session in a finally block. It never prints tokens, prompts or replies.
"""
import json
import os
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen


def origin_from_env() -> str:
    raw = os.getenv("CHATBOT_STAGING_ORIGIN", "")
    url = urlsplit(raw)
    if (
        url.scheme != "https" or not url.hostname or url.username or url.password
        or url.path not in ("", "/") or url.query or url.fragment
        or url.hostname in {"localhost", "127.0.0.1"}
    ):
        raise ValueError("Set CHATBOT_STAGING_ORIGIN to a dedicated HTTPS staging origin")
    if os.getenv("CHATBOT_STAGING_CONFIRM") != "yes":
        raise ValueError("Set CHATBOT_STAGING_CONFIRM=yes to authorize temporary staging data")
    return raw.rstrip("/")


def request(origin: str, path: str, method: str, token: str = "", payload=None):
    headers = {"Accept": "application/json"}
    if token:
        headers["Authorization"] = "Bearer " + token
    body = None
    if payload is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(payload).encode("utf-8")
    req = Request(origin + path, data=body, headers=headers, method=method)
    with urlopen(req, timeout=25) as response:
        status = response.status
        content = response.read(16384)
    return status, json.loads(content) if content else None


def smoke(origin: str) -> None:
    base = "/api/v1/chat/sessions"
    session_id = ""
    token = ""
    try:
        status, session = request(origin, base, "POST")
        if status != 201 or not isinstance(session, dict):
            raise RuntimeError("Session creation contract failed")
        session_id = session.get("session_id", "")
        token = session.get("token", "")
        if not isinstance(session_id, str) or not isinstance(token, str) or not session_id or not token:
            raise RuntimeError("Session credentials missing")
        print("PASS: session created")
        path = base + "/" + session_id
        status, result = request(
            origin, path + "/messages", "POST", token, {"message": "Hello"}
        )
        if (
            status != 200 or not isinstance(result, dict)
            or result.get("session_id") != session_id
            or not isinstance(result.get("reply"), str) or not result["reply"].strip()
        ):
            raise RuntimeError("AI response contract failed")
        print("PASS: authenticated AI reply received")
    finally:
        if session_id and token:
            try:
                status, _ = request(origin, base + "/" + session_id, "DELETE", token)
                if status != 204:
                    raise RuntimeError("Session deletion returned unexpected status")
                print("PASS: session deletion confirmed")
            except (HTTPError, URLError, TimeoutError, RuntimeError) as error:
                print("WARNING: deletion unconfirmed; check server TTL", file=sys.stderr)
                raise RuntimeError("Staging session cleanup failed") from error


if __name__ == "__main__":
    try:
        smoke(origin_from_env())
    except (ValueError, RuntimeError, HTTPError, URLError, TimeoutError):
        print("FAIL: staging smoke check; inspect staging service logs", file=sys.stderr)
        sys.exit(1)
