# Sprint 1 — privacy, security and catalogue governance

Status: **Implementation proposed in draft PR; production verification pending.**

Issues: #2, #7, #8, #10. No production deployment or secret changes are included.

## Privacy — #2

The previous notice incorrectly said the website does not store enquiries. The revised notice reflects the actual PostgreSQL enquiry and notification outbox design, Turnstile, Resend, optional consent-gated analytics and the conditional 90-day cleanup. This notice is based on the repository implementation only. **Business/legal approval is required** to verify other systems, real retention practices, privacy request procedures and applicable Canadian privacy obligations.

## Catalogue authorization — #7

The current source/test expectation is **48 products: 41 published and 7 drafts**. `src/data/catalog-authorization.ts` records client-reported permission, explicitly **not supplier-issued licensing evidence**. No authorization status or publication flag is changed in this sprint.

Required owner review before treating publication as fully verified:
- Obtain a product-by-product evidence record for image and description reuse from the rights holder or authorized representative.
- Check product source URL, supplier, category, technical specifications, availability and current business claims.
- Review the 16 installation photographs for permission, origin and truthful attribution.
- Reconcile README/production-readiness claims that still say all 48 records are unpublished.
- Keep the seven unresolved-source products as drafts until their sources are verified.

Do not invent evidence or automatically unpublish already-visible records without explicit business approval. If rights cannot be established, the owner must approve a safe removal/replacement plan promptly.

## API threat model — #8

| Surface | Existing control | Remaining verification |
| --- | --- | --- |
| POST /api/enquiries | 16 KiB cap, field validation, honeypot, Turnstile action/hostname, idempotency, generic persistence errors | Rate limiting at trusted hosting edge, abuse alerting, provider timeout handling, origin policy and traffic simulation |
| POST /api/internal/notification-worker | Server-only bearer secret, timing-safe compare, bounded queue and retries | Scheduler secret rotation, IP/edge policy, rate limits, queue telemetry, staging concurrency |
| POST /api/internal/notification-replay/[jobId] | Server-only bearer secret, bounded job ID, eligibility checks | Operator audit trail, replay approval and abuse monitoring |
| /admin/* | Server-verified Basic Auth, fail-closed if missing credentials, noindex | HTTPS enforcement, edge brute-force controls, credential rotation and staging verification |

Threats to test: automated form spam, credential guessing, replay misuse, provider unavailability, queue backlogs, personal data in logs, accidental cache/index leakage and reverse-proxy header trust. No exploit is claimed without reproducing it.

## HTTP security — #10

The existing `next.config.mjs` supplies `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` and removes `X-Powered-By`. The Sprint 1 patch adds explicit `Cache-Control: private, no-store` and `X-Robots-Tag: noindex, nofollow` on all /admin responses.

**Not implemented without deployment-specific validation:**
- Enforced Content Security Policy: inventory Next.js runtime scripts, Turnstile, GTM/GA4, remote images, inline JSON-LD and required origins; deploy report-only policy and review violations before enforcing a nonce/hash-based policy.
- HSTS: enable only after confirming HTTPS and subdomain scope at the reverse proxy or hosting edge.
- Rate limiting: apply at the hosting edge with trusted client-IP handling and test that legitimate enquiries are not blocked.
- Admin Basic Auth is a limited preview control, not a production CMS authentication system. Keep strong unique secrets, HTTPS and edge access restrictions.

## Required verification before issue closure

1. Run `npm ci`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build` on a clean worktree. The GitHub connector cannot run these commands.
2. Validate all /admin 200, 401, 404 responses for no-store and noindex over deployed HTTPS.
3. Conduct staging abuse tests for forms and internal endpoints without exposing real personal data or production credentials.
4. Obtain Vcare legal/business approval for privacy copy and catalogue/image rights.
5. Test CSP in report-only mode and edge rate limits/HSTS on the actual hosting platform.
6. Record outcomes in the issues; close #2, #7, #8 and #10 only after their own acceptance criteria pass.

## Change boundary

Only the privacy page, admin proxy, focused proxy tests and this audit record are changed. No product publication state, backend persistence, infrastructure or other projects are modified.
