# Sprint 4.4 — Rollout gate security hardening

## Finding

The Sprint 4.3 UI gate accepted any HTTPS origin when the allowed-hosts setting was merely nonempty. For example, setting the reviewed hostname in the allowlist while configuring a different HTTPS origin could still mount the live UI. The proxy has its own destination validation, so this was a misleading UI activation state, not proof that the proxy forwarded traffic to the unapproved host.

## Fix

- Parse the configured upstream using `URL` rather than string-prefix checks.
- Reject malformed URLs, embedded credentials, paths, query parameters and fragments.
- Require exact, case-insensitive hostname membership in the comma-separated reviewed allowlist for remote HTTPS.
- Permit only HTTP loopback addresses for local staging, consistent with the proxy.
- Preserve disabled-by-default behavior and the existing demo widget fallback.
- Add regression tests for domain suffix spoofing, unapproved HTTPS destinations and malformed URLs.

## Verification and deployment gates

Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build` in CI. A passing test suite does **not** replace staging browser E2E, accessibility testing, proxy/IP rate-limit review, or actual privacy/retention verification. Do not enable production flags until those checks are complete.

No environment variables, production deployment or backend infrastructure are changed in this PR.
