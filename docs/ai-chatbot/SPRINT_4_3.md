# Sprint 4.3 — Server-gated AI chat integration

## Implemented

- Root layout chooses the existing demo widget by default.
- Only when `isLiveChatEnabled()` returns true does it render the standalone AI chat launcher.
- Launcher opens the Sprint 4.2 consent-first panel; opening alone makes **no** API call.
- The AI panel still requires explicit visitor consent before creating a session.
- Admin pages suppress the launcher.
- Unit tests cover disabled-by-default rollout, independent UI and proxy flags, backend origin prerequisites and demo fallback.

## Required server-only configuration

Set these **only in a reviewed staging environment** initially:

```dotenv
VCARE_AI_CHAT_UI_ENABLED=true
VCARE_CHAT_PROXY_ENABLED=true
VCARE_CHAT_BACKEND_ORIGIN=https://<approved-backend-host>
VCARE_CHAT_BACKEND_ALLOWED_HOSTS=<approved-backend-host>
```

For local staging behind a loopback reverse proxy, an `http://127.0.0.1:<port>` origin can be used without the remote host allowlist. The proxy's own strict validation remains authoritative; the UI gate does not replace it.

Do not use `NEXT_PUBLIC_` for these settings. A redeploy or server restart may be required for server-side environment changes.

## Release blockers

1. Complete staging browser E2E for consent, chat, retries, session expiry, close, deletion and keyboard accessibility.
2. Review disclosures and retention against actual backend and AI provider policies.
3. Verify secure backend origin, OpenRouter availability, observability and redaction, abuse/rate limits and public IP handling.
4. Confirm the UI's close/unmount deletion behavior and document fallback if deletion fails.
5. Obtain explicit approval for production activation and define rollback: unset `VCARE_AI_CHAT_UI_ENABLED`, redeploy and retain the demo widget.

**This PR does not enable live chat, change production environment settings, deploy the backend or modify existing demo behavior by default.**
