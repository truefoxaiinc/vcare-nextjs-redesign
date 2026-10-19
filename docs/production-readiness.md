# Production-readiness checklist

Status means: **Verified** is supported by repository inspection or a recorded command result; **Pending** has not been completed or lacks evidence; **Not applicable** is used only where the current documented scope makes an item unnecessary.

## Customer and catalogue readiness

- **Implemented locally; deployment and database verification pending** — Quote/contact submissions are validated server-side, checked with Cloudflare Turnstile, and transactionally persist an enquiry plus a pending notification job. The client reports durable acceptance, not email delivery. A secret-protected worker endpoint retries eligible Resend failures; no scheduler is configured. Verify the migration and queue behavior against a disposable staging PostgreSQL database before production.
- **Implemented locally; deployment verification pending** — The public product catalogue is static and requires no database. All 48 records remain unpublished until image and description reuse permission is documented and the source record is explicitly updated. The `/admin/catalogue-preview` route is noindex and protected by server-verified Basic Authentication. Configure unique preview credentials and HTTPS.
- **Pending** — Verify product specifications, availability, service coverage, and other customer-facing claims against current business records.
- **Pending** — Obtain and record client/supplier authorization for each product description and image before publishing the static product record.

## Privacy, accessibility, and performance

- **Pending** — Review the privacy notice and consent behavior against the actual analytics and data-handling practices. The current consent UI has no visible way to reopen preferences after dismissal.
- **Pending** — Check key pages and interactions for accessibility, including keyboard use, screen-reader behavior, responsive layouts, and color contrast. The primary orange has been darkened to `#b8390f`; its contrast is at least 4.72:1 on the inspected white, paper, cream, warm-neutral, and hero backgrounds. Accent text on the orange offer band and focus indicators on dark surfaces have separate high-contrast colors. Browser and full-site contrast verification remain pending.
- **Pending** — Review image loading and performance. Product-card and product-detail images now use Next.js image optimization, but other external imagery remains unoptimized and performance has not been measured. Use approved assets and test representative mobile and desktop routes.
- **Pending** — Validate SEO metadata, redirects, sitemap contents, and canonical URLs against production URLs and legacy links before a domain migration.
- **Pending** — The default Open Graph image uses the supplied wide logo. Obtain a business-approved social-preview image (recommended 1200 × 630), confirm its branding and usage rights, and update the metadata before launch; no replacement artwork has been created.

## Engineering and operations

- **Verified** — `npm run lint` completed successfully in the audit.
- **Verified** — `npm run typecheck` completed successfully in the audit.
- **Verified** — `npm run build` completed successfully in the audit and generated the listed routes.
- **Implemented locally; integration verification pending** — Vitest tests cover request validation, API status handling, idempotent enqueue behavior, delivery classification, queue policies, retention limits, worker authorization, and replay boundaries. Database concurrency, transaction, migration, and retention behavior still need disposable-PostgreSQL integration tests.
- **Pending** — Configure CI/CD to run appropriate checks and control production releases; no project CI workflow was found.
- **Pending** — Review and configure security headers for the hosting environment. The app sets several baseline headers in `next.config.mjs`; a Content Security Policy was not found.
- **Pending** — Define production logging, monitoring, alerting, and incident ownership; no project monitoring setup was found.
- **Pending** — Confirm staging and production environments, scheduler configuration, secrets management, backup/restore, and release/rollback ownership. The local Compose file is for development only; no Vercel project association, Cron configuration, CI workflow, or hosted staging database was found.
- **Pending** — Run a production smoke test after deployment: verify critical public routes, mobile navigation, enquiry delivery, redirect behavior, analytics consent, and admin protection.

## Phase 1 — Git safety and first-release scope

The project folder `C:\Users\USER\Downloads\vcare-nextjs-redesign` now has its own local Git repository on `main`, with `origin` configured for the intended GitHub repository. At the time the remote was checked, it was empty. Keep all Git operations scoped to the project directory; do not stage or clean the parent repository, which contains files outside this project.

The project includes `dev`, `build`, `start`, `lint`, `typecheck`, database-development scripts, and a Vitest `test` script. Product descriptions, images, and publication state are static source records; filters and the area calculator run in the client. The authenticated catalogue preview is read-only. Enquiry persistence and the durable notification outbox still use PostgreSQL and require separate staging-database verification. The other existing route handlers implement legacy redirects.

Top first-release blockers, based on repository evidence:

1. **Pending — Git safety:** establish a project-scoped repository/worktree and review its status before any staging or release operation.
2. **Implemented locally; pending deployment verification — Static catalogue preview:** configure unique `ADMIN_USERNAME` and `ADMIN_PASSWORD` secrets, deploy only behind HTTPS, and verify authenticated access to `/admin/catalogue-preview`. Product publication is a reviewed static data change; it needs no catalogue database or migration.
3. **Implemented locally; pending staging/production setup — Enquiries:** configure the PostgreSQL, Resend, Turnstile, and worker secrets; apply the additive migration only after backup and staging validation; configure an authorized scheduler and verify notification behavior without claiming exactly-once delivery.
4. **Pending — Customer-facing data and media:** verify product prices, specifications, availability, offers, and service claims; replace or approve illustrative imagery and confirm usage rights.
5. **Pending — Release verification:** address the privacy/consent and accessibility findings above, configure CI checks, define hosting/security/monitoring procedures, and complete a production smoke test. The project has a test script but no configured CI workflow or deployment/monitoring setup.
