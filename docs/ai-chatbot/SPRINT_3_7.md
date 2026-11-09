# Sprint 3.7 — Feature-gated recommendation browser adapter

## Scope

Introduce a tested browser adapter for the authenticated structured recommendations API without activating the AI chatbot or changing the public demo widget.

- `src/lib/chatbot-recommendations.ts` provides `fetchRecommendations`, `parseRecommendations`, and `isApprovedProductLink`.
- Requires an existing session ID and bearer token supplied by a future authenticated session controller.
- Uses a same-origin API path, `no-store`, URL-encoded queries, optional abort signal, and strict canonical product-link validation.
- Rejects malformed product cards, unsupported product links, excessive result counts, and inconsistent evidence statuses.
- Tests verify valid responses, tampered links, invalid metadata, authorization and same-origin request behavior.

## Deployment and security gates

**This adapter is not connected to the visible widget.** The current widget remains a demo with no network calls or AI claims. The new client makes no requests until explicitly invoked.

Before enabling, implement a reviewed same-origin reverse proxy to the FastAPI backend (with session security, rate limiting, and HTTPS), a client session lifecycle with deletion and consent, a visible feature flag, and product-card UI with accessible labels. Do not expose OpenRouter credentials or store bearer tokens in persistent browser storage. Validate CORS and CSRF behavior at the proxy boundary.

The adapter validates only the declared product-card fields and canonical links; it does not establish that stock, prices or availability exist. No catalogue snapshot is activated.

## Review

- Next.js typecheck, lint, unit tests and build must pass.
- Python quality CI must remain green.
- No merge or deployment without review.
