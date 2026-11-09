# Sprint 3.9 — Disabled-by-default same-origin chat API proxy

## Implementation

Next.js Node route handler at `/api/v1/chat/sessions/[[...path]]` proxies only four operations:

| Method | Path | Purpose |
| --- | --- | --- |
| POST | /api/v1/chat/sessions | Create session |
| POST | /api/v1/chat/sessions/{uuid}/messages | Send message |
| GET | /api/v1/chat/sessions/{uuid}/recommendations?q=... | Approved catalogue cards |
| DELETE | /api/v1/chat/sessions/{uuid} | Delete session |

Other routes and methods are not forwarded. Request origin checks reject cross-site browser origins. Bearer credentials are forwarded only to session-bound operations; body and query are validated. Responses are bounded, uncached and stripped of upstream cookies, redirects and CORS headers. Redirects are not followed. Upstream failures return generic errors.

## Activation controls

The proxy is **disabled by default**. Both server-only environment variables are required:

- `VCARE_CHAT_PROXY_ENABLED=true`
- `VCARE_CHAT_BACKEND_ORIGIN=https://<reviewed-backend-host>` (or HTTP loopback only for a local reverse proxy)

Do not set these in production until the backend is deployed and verified behind HTTPS. Do not use `NEXT_PUBLIC_` variables for backend configuration. Keep the public demo widget unchanged until a separate, reviewed UI feature flag and consent flow are ready.

## Security review before activation

- Restrict the upstream destination with deployment-level egress rules and audited server-only configuration; no client-selected URLs.
- Confirm proxy trust boundaries, IP-based rate limits, backend auth, and actual public IP propagation. This proxy intentionally does not forward untrusted X-Forwarded-For.
- Validate upstream response sizes, backend JSON schema, privacy disclosures, logging redaction, and abuse protections in staging.
- Ensure frontend and backend have compatible deployment targets and latency budgets.
- Review CSRF/origin behavior for browsers and enforce additional anti-abuse controls for unauthenticated session creation.

## Rollout

No production deployment, no DNS changes, no backend configuration changes and no activation of live AI are part of this PR.
