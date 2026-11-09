# Sprint 2.2 — Secure chat API hardening

## API contract and compatibility

The unauthenticated legacy `POST /api/v1/chat/messages` endpoint now responds with HTTP **410 Gone** for valid requests. This is intentionally breaking for direct legacy API consumers; the Next.js demo widget is unchanged and does not call this endpoint. All LLM requests must use the session API and an opaque bearer token. No public deployment is authorized by this PR.

`GET /api/v1/chat/sessions/{id}/messages` and `DELETE /api/v1/chat/sessions/{id}` now enforce the same IP and session Redis rate limits as message posting. The API ignores untrusted forwarded-for headers; configure a trusted proxy separately before public exposure.

## Concurrent messages

The message and deletion endpoints use an atomic Redis SET NX EX lock per session. A second concurrent message returns HTTP 409. The lock is released by a compare-and-delete Lua script and expires if the process crashes. Configure `MESSAGE_LOCK_TTL_SECONDS` greater than the OpenRouter timeout plus safety margin. Provider calls that exceed the lock TTL could still race; a full database-fenced transactional design is required before strict exactly-once guarantees.

## Retention and cleanup

The isolated `cleanup` Compose service invokes `python -m app.cleanup` hourly to purge expired sessions and their turns, after the configurable grace period (`EXPIRED_SESSION_GRACE_SECONDS`, default 3600). It only connects to the chatbot database network. The API does not run migrations or purge data on startup. This cleanup loop is designed for the isolated Compose deployment only; use a managed scheduler if deployed outside Compose.

## CI validation

Python CI provisions ephemeral PostgreSQL 16 and Redis 7.4 service containers and runs `pytest -q`, including:
- Alembic upgrade, downgrade and upgrade roundtrip
- Real PostgreSQL conversation/turn persistence
- Real Redis atomic throttling
- Existing SQLite-based API contract tests and lock ownership tests

No changes to the Next.js production app, Prisma database, or existing VPS services. Confirm CI green and review migration/data deletion semantics before merging.

## Remaining production gates

- Verify actual Docker Compose startup, network egress, and resource usage in isolated staging.
- Configure trusted proxy IP handling, HTTPS, response headers, monitoring and OpenRouter spend limits.
- Implement strict database-fenced concurrency if multiple API replicas or long-running provider calls are planned.
- Verify data retention and consent policy with the business; implement privacy-safe audit logs.
- Perform load tests and a full deployment/rollback rehearsal.

**Do not merge or deploy automatically.**
