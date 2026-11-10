# Sprint 5.1 — Opt-in staging API smoke check

## Scope

Add a minimal, **manual-only** smoke check for the deployed same-origin chat API. It checks session creation, an authenticated greeting through the configured AI backend, and session deletion. The script prints only pass/fail status, not bearer tokens, visitor text or model replies.

## Preconditions

1. Deploy FastAPI, PostgreSQL, Redis, migrations and OpenRouter configuration to a **dedicated staging** environment.
2. Configure the staging Next.js proxy with the exact allowed HTTPS backend origin. Do not enable production UI flags.
3. Verify staging DNS/TLS and ensure the endpoint is authorized for temporary test conversations.
4. Use a non-production OpenRouter key and test-only catalogue data.

## Manual run

From `ai-chatbot-backend`:

```bash
CHATBOT_STAGING_ORIGIN=https://your-staging-host.example \\
CHATBOT_STAGING_ALLOWED_ORIGIN=https://your-staging-host.example \\
CHATBOT_STAGING_CONFIRM=yes \\
python scripts/staging_smoke.py
```

Do **not** point this at production. This test incurs a real AI provider request and creates a short-lived conversation. Cleanup is attempted in `finally` even if the AI request fails. On deletion failure, investigate the staging backend and TTL.

## CI coverage

`pytest -q tests/test_staging_smoke.py` exercises the guard, request sequence, and cleanup with fake requests. GitHub Actions must not run the live smoke script automatically or require staging secrets.

## Still pending

Browser-level consent, accessibility, rapid-submit, failure/retry, catalogue grounding, real VPS staging deployment, observability and rollback verification. A passing smoke check alone does not authorize production launch.

## Sprint 5.2 staging target safety

The smoke script requires `CHATBOT_STAGING_ALLOWED_ORIGIN` to exactly match `CHATBOT_STAGING_ORIGIN`. Set the allowlisted value independently in the staging run environment and review it before running; do not copy production addresses into either variable. The script also refuses HTTP redirects, preventing authenticated session requests from following a redirect to a different host. This is a guard against accidental misconfiguration, not proof of staging isolation; operators must still verify DNS, infrastructure, and access controls.
