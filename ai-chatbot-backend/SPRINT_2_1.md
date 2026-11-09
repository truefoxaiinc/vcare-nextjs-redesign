# Sprint 2.1 — Isolated session and conversation-memory backend

## New API (opt-in; existing stateless endpoint remains unchanged)

- `POST /api/v1/chat/sessions` returns an opaque bearer token, session ID and expiry.
- `POST /api/v1/chat/sessions/{id}/messages` requires `Authorization: Bearer <token>`.
- `GET /api/v1/chat/sessions/{id}/messages` returns a bounded history with the same credential.
- `DELETE /api/v1/chat/sessions/{id}` deletes the session and turns.

Treat the bearer token as a secret. Never put it in query strings, analytics, browser logs, or source control. The public session ID alone cannot authorize access. Credentials are stored only as SHA-256 digests; raw tokens are returned once.

## Persistence and rate limits

An isolated PostgreSQL database stores session records and turns. Alembic migration `0001_sessions` creates the schema. A Redis atomic INCR+EXPIRE script enforces per-IP and per-session requests per minute; Redis errors fail closed. History is capped at 20 turns by default. Session credentials expire after 24 hours; expired rows still require scheduled purging. No automatic data-retention worker is included.

The existing `POST /api/v1/chat/messages` legacy endpoint is unchanged and **does not** enforce session or Redis throttling. Do not publicly expose it until a follow-up migration/deprecation plan is approved.

## Local/staging setup — not deployed

1. Copy `.env.example` to `.env`; supply an OpenRouter key and a strong URL-safe `CHATBOT_DB_PASSWORD`. Avoid reserved URL characters in the password unless properly URL-encoded.
2. Run `docker compose config` and review resource usage, port 18720, existing VPS bridge/firewall policies and outbound access before starting services.
3. Create isolated services using `docker compose up -d db redis`.
4. Run migrations using the API image with the same database network and environment: `docker compose run --rm api alembic upgrade head`. Review first: the API image must contain Alembic, and no automatic migrations run at startup.
5. Start API only after successful migrations. PostgreSQL and Redis have no published ports; API binds to localhost. Only the API joins the separate egress network for OpenRouter HTTPS.

**Important:** Docker network isolation does not replace host firewall review. Do not deploy this Compose file on the shared VPS without explicit authorization. No changes to the existing Next.js application or Prisma database are required.

## Known follow-ups before public exposure

- Secure the legacy stateless route or remove it after frontend migration.
- Enforce request throttling on history and deletion endpoints, and add request concurrency limits.
- Add automatic expired-session/turn purging, retention policy, and consent controls.
- Add per-session locking to avoid overlapping messages racing; add structured sales state.
- Add integration tests against actual PostgreSQL/Redis, migration roundtrip, network egress and load tests.
- Add monitoring, privacy-safe logs, OpenRouter spend ceilings, trusted-proxy IP policy, and staging rollback.
