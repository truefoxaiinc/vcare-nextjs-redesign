# AI Chatbot Security & Privacy Design

## Trust boundaries
Browser and retrieved documents are untrusted. OpenRouter API key, database credentials and tool authorization remain server-side. Never expose internal API directly to browsers without proper controls.

## Controls
- Cryptographically random session credentials, expiration and per-session ownership checks; session ID alone grants no access.
- Request body, message length, history and token caps; per-IP/session rate limiting; bounded concurrency and model spend.
- Pydantic tool input validation, output sanitization, tool allowlist and strict permission checks. Never execute instructions from RAG text.
- Provider timeouts, bounded retries with jitter for idempotent calls, circuit-breaker/fallback and no raw error disclosure.
- PII minimization, explicit lead consent, retention/deletion policy, redacted structured logs and restricted admin access.
- No chat-triggered direct quote submission, external email, database writes outside approved session/lead state or arbitrary web browsing.
- Isolated Docker credentials, non-root containers, secrets excluded from Git, dependency scanning and least-privilege DB users.

## Threat tests
Prompt injection, data exfiltration, fake tool output, malformed JSON, token exhaustion, replay, cross-session access, rate-limit bypass, hallucinated availability, provider outage and log leakage.
