# Sprint 4.1 — Consent-gated chat lifecycle controller

## Delivered

- `ChatController` orchestrates the previously merged authenticated session client.
- Explicit `start(true)` is required before any network call; `start(false)` rejects.
- Single-flight message sending; duplicate and concurrent sends are rejected.
- In-memory session credentials only, no persistence or logging.
- Closing aborts in-flight work, attempts authenticated deletion, and suppresses late replies.
- Closing while session creation is pending waits for the session result and deletes it if creation succeeds.
- Unit tests cover consent, normal lifecycle, concurrent messages, cancellation, creation race and deletion failure.

## Boundaries

**Not wired into the public demo widget.** The live AI feature is not enabled. This is a reusable state controller for a future explicitly consented UI. Session deletion is best-effort: if network deletion fails, the backend's TTL/expiry policy remains the fallback. Callers should display deletion failures honestly rather than claiming remote deletion succeeded.

## Remaining production gates

1. Confirm backend service and the Sprint 3.9 proxy are deployed in staging, with allowlisted HTTPS origin and real rate-limit controls.
2. Build a visible consent screen explaining that user messages are sent to Vcare's AI backend and its configured LLM provider; link to the accurate privacy policy.
3. Implement accessible UI states for connecting, ready, sending, closing, errors and session expiry; call `close()` on user close and navigation/unmount where practical.
4. Add a separate server-controlled rollout flag; do not enable public chat until privacy/security/UX review.
5. Run Next.js typecheck, lint, Vitest and build; verify no regression in the existing demo.

No environment changes, deployment, live chatbot activation or catalogue modifications are included.
