# Sprint 5.3 — Verify staging session revocation

## Why

The existing staging smoke test checked that DELETE returned HTTP 204 but did not confirm that the bearer token was actually unusable afterward.

## Change

After a successful DELETE, perform an authenticated GET on the deleted session's message history. The expected response is HTTP 401 (the session no longer authenticates). A successful response or any other HTTP status fails the smoke test. No tokens or conversation text are printed.

## Validation

Offline tests cover the expected 401 response and unexpected 200, 403, 404, and 500 responses. Run `ruff check .` and `pytest -q` from `ai-chatbot-backend`. The live smoke script remains manual-only, requires a dedicated allowlisted HTTPS staging origin and explicit confirmation, and must never be run against production.

## Remaining work

Deploy a dedicated staging environment, execute the smoke test with staging credentials, validate real product recommendations and browser E2E behavior, then review monitoring and rollback readiness before any production rollout.
