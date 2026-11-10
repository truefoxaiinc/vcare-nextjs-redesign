# Sprint 4.6 — Client bearer credential validation

## Finding

The browser session parser checked the bearer token format when a session was created, but later send and delete methods accepted a mutated or malformed in-memory token. This could create invalid Authorization headers or allow requests that the same-origin proxy would reject.

## Change

Use a shared bearer-token validator for session creation parsing, sending messages, and deleting sessions. Reject malformed credentials before network activity. Session deletion intentionally does **not** require a future expiry timestamp, so the browser can still request cleanup for expired sessions.

## Regression coverage

Add tests for empty, short, oversized, whitespace, newline and punctuation-bearing tokens, ensuring neither send nor delete calls fetch.

## Validation and rollout

GitHub Actions must pass typecheck, lint, unit tests and build. Staging must separately validate real consent, OpenRouter replies, session deletion and failure handling. No production activation or deployment is part of this PR.
