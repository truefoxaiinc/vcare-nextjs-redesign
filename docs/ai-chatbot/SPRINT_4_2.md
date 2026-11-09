# Sprint 4.2 — Standalone consent-first AI chat panel

## Delivered

- `src/components/vcare-ai-chat-panel.tsx` implements an accessible standalone chat panel.
- Explicit, user-initiated consent is required before session creation; no background requests on mount.
- Disclosure explains that chat messages are sent to the Vcare AI backend and configured AI model provider, and warns against sharing sensitive information.
- Message form, connection and response status, error states, and a user-controlled end-chat/deletion request.
- Session credentials remain in the in-memory `ChatController`; conversation content is rendered as React text, not injected HTML.
- Cleanup on unmount and honest deletion-failure messaging when the panel remains mounted.
- Static integration-contract tests ensure this component is **not** mounted in the public layout and that the existing demo remains in place.

## Deliberately excluded

The component is not imported into the site layout or routes, and the public demo widget is unchanged. No environment flag has been enabled, no backend has been deployed, and no external API requests occur from the current website.

## Production activation gates

1. Review privacy policy, retention, AI provider disclosures and any applicable consent requirements.
2. Verify deployed FastAPI service, secure proxy allowlist, session authentication, rate limiting and operational monitoring in staging.
3. Add a server-controlled feature flag and reviewed mounting point, then conduct real browser accessibility and end-to-end tests.
4. Handle transient errors, network loss, token expiry and deletion failures with approved UX. Do not claim deletion succeeded without confirmation.
5. Run typecheck, lint, Vitest and production build before any merge.

No production deployment or live AI activation is included in this sprint.
