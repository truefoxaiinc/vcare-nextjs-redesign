"""Opt-in staging smoke check. Never run against production.

Usage:
  CHATBOT_STAGING_ORIGIN=https://staging.example.com \
    python scripts/staging_smoke.py

The script creates a temporary session, asks a greeting, and deletes the
session in a finally block. It never prints tokens, prompts or replies.
"""
import json
import os
import re
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener


def origin_from_env() -> str:
    raw = os.getenv("CHATBOT_STAGING_ORIGIN", "")
    url = urlsplit(raw)
    if (
        url.scheme != "https" or not url.hostname or url.username or url.password
        or url.path not in ("", "/") or url.query or url.fragment
        or url.hostname in {"localhost", "127.0.0.1"}
    ):
        raise ValueError("Set CHATBOT_STAGING_ORIGIN to a dedicated HTTPS staging origin")
    # Exact allowlisting protects against accidentally targeting a different host.
    allowed = os.getenv("CHATBOT_STAGING_ALLOWED_ORIGIN", "").rstrip("/")
    if not allowed or raw.rstrip("/") != allowed:
        raise ValueError("CHATBOT_STAGING_ORIGIN must match CHATBOT_STAGING_ALLOWED_ORIGIN")
    if os.getenv("CHATBOT_STAGING_CONFIRM") != "yes":
        raise ValueError("Set CHATBOT_STAGING_CONFIRM=yes to authorize temporary staging data")
    return raw.rstrip("/")


class NoRedirects(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        # Never forward bearer credentials to a redirected destination.
        return None


def request(origin: str, path: str, method: str, token: str = "", payload=None):
    headers = {"Accept": "application/json"}
    if token:
        headers["Authorization"] = "Bearer " + token
    body = None
    if payload is not None:
        headers["Content-Type"] = "application/json"
        body = json.dumps(payload).encode("utf-8")
    req = Request(origin + path, data=body, headers=headers, method=method)
    with build_opener(NoRedirects).open(req, timeout=25) as response:
        status = response.status
        content = response.read(16384)
    return status, json.loads(content) if content else None



PRODUCT_SLUG = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SOURCE_COMMIT = re.compile(r"^[0-9a-f]{40}$")
PRODUCT_HOSTS = {"www.vcarehardwoodfloors.ca", "vcarehardwoodfloors.ca"}


def valid_product_card(product: object) -> bool:
    if not isinstance(product, dict):
        return False
    slug = product.get("slug")
    if not isinstance(slug, str) or not PRODUCT_SLUG.fullmatch(slug):
        return False
    for field in ("name", "category", "supplier", "description"):
        if not isinstance(product.get(field), str) or not product[field].strip():
            return False
    if any(key in product for key in ("price", "stock")):
        return False
    canonical = product.get("canonical_url")
    if not isinstance(canonical, str):
        return False
    try:
        url = urlsplit(canonical)
        return (
            url.scheme == "https" and url.hostname in PRODUCT_HOSTS
            and url.username is None and url.password is None
            and url.port in (None, 443)
            and url.path == "/products/" + slug
            and not url.query and not url.fragment
        )
    except ValueError:
        return False


def valid_recommendations(payload: object) -> bool:
    if not isinstance(payload, dict):
        return False
    status = payload.get("evidence_status")
    products = payload.get("products")
    revision = payload.get("source_commit")
    if status not in {"matched", "no_match", "unavailable"} or not isinstance(products, list):
        return False
    if len(products) > 3 or any(not valid_product_card(item) for item in products):
        return False
    if status == "matched":
        return bool(products) and isinstance(revision, str) and bool(SOURCE_COMMIT.fullmatch(revision))
    if products:
        return False
    if status == "unavailable":
        return revision is None
    return isinstance(revision, str) and bool(SOURCE_COMMIT.fullmatch(revision))


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
        # Validate the authenticated, catalogue-backed recommendations contract.
        query = urlencode({"q": "oak flooring"})
        status, recommendations = request(
            origin, path + "/recommendations?" + query, "GET", token
        )
        if status != 200 or not valid_recommendations(recommendations):
            raise RuntimeError("Recommendations API contract failed")
        products = recommendations["products"]
        if os.getenv("CHATBOT_STAGING_REQUIRE_CATALOGUE") == "yes" and (
            recommendations["evidence_status"] != "matched" or not products
        ):
            raise RuntimeError("Staging approved catalogue evidence is not matched")
        print("PASS: authenticated recommendations contract validated")
    finally:
        if session_id and token:
            try:
                status, _ = request(origin, base + "/" + session_id, "DELETE", token)
                if status != 204:
                    raise RuntimeError("Session deletion returned unexpected status")
                # A 204 alone does not prove the bearer token was revoked.
                try:
                    request(origin, base + "/" + session_id + "/messages", "GET", token)
                except HTTPError as error:
                    if error.code != 401:
                        raise RuntimeError("Deleted session returned unexpected authorization status") from None
                else:
                    raise RuntimeError("Deleted session token remains usable")
                print("PASS: session deletion and token revocation confirmed")
            except (HTTPError, URLError, TimeoutError, RuntimeError) as error:
                print("WARNING: deletion unconfirmed; check server TTL", file=sys.stderr)
                raise RuntimeError("Staging session cleanup failed") from error


if __name__ == "__main__":
    try:
        smoke(origin_from_env())
    except (ValueError, RuntimeError, HTTPError, URLError, TimeoutError):
        print("FAIL: staging smoke check; inspect staging service logs", file=sys.stderr)
        sys.exit(1)
