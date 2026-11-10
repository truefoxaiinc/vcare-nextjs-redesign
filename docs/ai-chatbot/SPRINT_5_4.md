# Sprint 5.4 — Recommendations staging smoke

The opt-in staging smoke now checks the authenticated `/recommendations?q=oak+flooring` endpoint within the temporary session, before deleting the session and verifying token revocation. It validates the response structure, product names, HTTPS canonical URLs, and absence of price/stock fields. It does **not** prove that the model's free-text answer is grounded.

For staging with a pinned, approved catalogue snapshot, set `CHATBOT_STAGING_REQUIRE_CATALOGUE=yes` in addition to `CHATBOT_STAGING_ORIGIN`, `CHATBOT_STAGING_ALLOWED_ORIGIN`, and `CHATBOT_STAGING_CONFIRM=yes`. This makes missing or unmatched evidence fail the smoke check. Without the flag, the script accepts a valid `unavailable` or `no_match` response, so the result is a contract check, not catalogue-readiness certification.

The script is manual-only, calls a real AI provider, and must not be used on production. Review staging isolation and TLS before running. Offline tests mock network calls and validate failure cleanup. Next: deploy isolated VPS staging and run real browser and conversation-quality evaluations.
