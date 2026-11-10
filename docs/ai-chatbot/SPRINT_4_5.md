# Sprint 4.5 — Chat session lifecycle hardening

## Finding

The chat controller documented `close()` as idempotent, but a second call during an in-progress close rejected with `Chat close already in progress`. UI teardown and visitor-initiated deletion can race. This could incorrectly report deletion failure even when the first request was succeeding.

## Change

- Concurrent callers receive the **same close promise**.
- The controller aborts outstanding work, waits for session creation to settle, and attempts backend deletion once.
- All concurrent callers observe the same deletion success or failure.
- A later close after completion remains a no-op.
- Add regression tests for concurrent deletion, deletion failure and late session creation.

## Validation

Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` in GitHub Actions. This is lifecycle unit coverage, **not** a substitute for browser staging E2E.

## Staging acceptance still required

1. Consent before creating any backend session.
2. Real FastAPI/OpenRouter message round trip through the same-origin proxy.
3. Close during connection and while sending; confirm server deletion.
4. Simulate upstream timeout, invalid credentials and deletion failure.
5. Check keyboard navigation, focus management, and screen reader announcements.
6. Confirm rate limits, logs/redaction and session expiry.
7. Keep production UI flag off until security, privacy and staging sign-off.

No production flags, infrastructure, or deployment configuration changed.
