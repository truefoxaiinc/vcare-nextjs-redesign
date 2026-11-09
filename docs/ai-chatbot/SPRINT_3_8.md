# Sprint 3.8 — In-memory authenticated chat session client

## Delivered

- Browser-side `createChatSession`, `sendChatMessage`, and `deleteChatSession` adapters matching FastAPI's session API.
- Runtime validation of session IDs, bearer credentials, expiry timestamps, reply payloads, and session ownership.
- Same-origin, `no-store` requests; no localStorage, sessionStorage, cookies, or automatic startup.
- Unit tests for successful lifecycle, invalid credentials, mismatched replies, invalid messages, and deletion.

## Security and operational boundaries

**This is an inactive integration component, not a live chatbot rollout.** The public chat demo remains unchanged and sends no messages to the backend. The adapters are invoked only by future opt-in UI code. Do not log tokens or persist them in browser storage.

Before UI activation:
1. Build and audit a same-origin Next.js-to-FastAPI proxy with allowlisted upstream origin, exact route/method mapping, payload limits, timeout, and trusted client IP policy.
2. Implement explicit opt-in and a visible disclosure that messages will be transmitted to the AI backend/provider; provide clear/delete session behavior.
3. Add frontend controller handling aborts, rate limits, session expiry, and network failure; keep credentials only in memory and delete on close when possible. Backend TTL handles abrupt exits.
4. Validate HTTPS, CORS/CSRF, backend authentication, production feature flag, abuse protections and accessibility in staging.

No backend, VPS, Vercel, environment, catalogue or live widget changes are included.
