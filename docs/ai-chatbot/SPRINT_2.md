# V CARE AI Sales Agent — Sprint 2 delivery checklist

Status: In progress. This PR establishes Python quality gates only; session persistence is not implemented by this PR.

## Current baseline

- FastAPI `POST /api/v1/chat/messages` is stateless.
- OpenRouter is configured server-side; no live provider verification has been performed.
- The Next.js widget still shows fixed demo replies.
- The backend is not approved for public deployment.

## Next implementation PR: secure sessions and persistence

1. Add cryptographically random session credentials, expiry, revocation and ownership checks. A public session identifier alone must not authorize history access.
2. Add an isolated PostgreSQL database and Alembic migrations for sessions, turns, validated sales state, consent and retention; no changes to the existing Next.js Prisma schema.
3. Add Redis per-IP and per-session throttling, message/token limits, bounded concurrency and cost ceilings.
4. Implement bounded conversation history with explicit consent and privacy-safe retention/deletion behavior. Validate all structured fields.
5. Add tests for cross-session access, expiry, replay, prompt injection, oversized requests, provider outage and redacted logs.
6. Use isolated Compose services; verify VPS ports and networks before any staging rollout.
7. Require passing Python CI before merging; never expose the API publicly without security review.

## Later PRs

- Approved catalogue-only search and source-grounded RAG; exclude drafts and unverified pricing.
- Natural sales conversation state and human handoff evaluation.
- Same-origin Next.js proxy and consent-based prefill of the existing quote form.
- Staging, monitoring, backup/restore, security and production release gates.

## Acceptance for this PR

- Python 3.12 install, Ruff and pytest run on backend changes.
- No Next.js runtime, Prisma, Apache, production deployment or secrets modified.
- CI status must be reviewed; do not claim passing checks until GitHub reports success.
