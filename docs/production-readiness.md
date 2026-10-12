# Production-readiness checklist

Status means: **Verified** is supported by repository inspection or a recorded command result; **Pending** has not been completed or lacks evidence; **Not applicable** is used only where the current documented scope makes an item unnecessary.

## Customer and catalogue readiness

- **Pending** — Replace the quote/contact `mailto:` flow with reliable server-side enquiry delivery; verify submission, failure handling, and delivery.
- **Pending** — Protect or remove the admin preview before deployment. Implement and test authentication and authorization before treating admin routes as operational.
- **Pending** — Verify catalogue prices, specifications, availability, sale terms, service coverage, and other customer-facing claims against current business records.
- **Pending** — Replace illustrative imagery with approved, appropriately licensed product imagery.

## Privacy, accessibility, and performance

- **Pending** — Review the privacy notice and consent behavior against the actual analytics and data-handling practices. The current consent UI has no visible way to reopen preferences after dismissal.
- **Pending** — Check key pages and interactions for accessibility, including keyboard use, screen-reader behavior, responsive layouts, and color contrast. The audit measured the primary orange (`#ed4a16`) against white at about 3.76:1, below 4.5:1 for normal text.
- **Pending** — Review image loading and performance. Product and gallery images are external and frequently use `unoptimized`; test representative mobile and desktop routes with approved assets.
- **Pending** — Validate SEO metadata, redirects, sitemap contents, and canonical URLs against production URLs and legacy links before a domain migration.

## Engineering and operations

- **Verified** — `npm run lint` completed successfully in the audit.
- **Verified** — `npm run typecheck` completed successfully in the audit.
- **Verified** — `npm run build` completed successfully in the audit and generated the listed routes.
- **Pending** — Add focused automated tests; no test files or test script were found in the project audit.
- **Pending** — Configure CI/CD to run appropriate checks and control production releases; no project CI workflow was found.
- **Pending** — Review and configure security headers for the hosting environment. The app sets several baseline headers in `next.config.mjs`; a Content Security Policy was not found.
- **Pending** — Define production logging, monitoring, alerting, and incident ownership; no project monitoring setup was found.
- **Pending** — Document and verify the deployment environment, required environment variables, secrets management, and release/rollback process. No Docker or deployment configuration was found.
- **Pending** — Run a production smoke test after deployment: verify critical public routes, mobile navigation, enquiry delivery, redirect behavior, analytics consent, and admin protection.

## Phase 1 — Git safety and first-release scope

The project folder `C:\Users\USER\Downloads\vcare-nextjs-redesign` now has its own local Git repository on `main`, with `origin` configured for the intended GitHub repository. At the time the remote was checked, it was empty. Keep all Git operations scoped to the project directory; do not stage or clean the parent repository, which contains files outside this project.

Package scripts are `dev`, `build`, `start`, `lint`, and `typecheck`; no test script was found. The app is a frontend prototype: product/article data is local, filters and the area calculator run in the client, quote/contact forms use `mailto:`, and admin pages are static preview UI. The route handlers found only implement legacy redirects. `.env.example` lists database and authentication settings, but no database/auth integration was found in the source.

Top first-release blockers, based on repository evidence:

1. **Pending — Git safety:** establish a project-scoped repository/worktree and review its status before any staging or release operation.
2. **Pending — Public admin exposure:** remove the admin preview from the public release or implement and verify access control. `noindex` is not authorization.
3. **Pending — Enquiries:** implement a reliable server-side quote/contact delivery path and verify delivery and failure handling.
4. **Pending — Customer-facing data and media:** verify product prices, specifications, availability, offers, and service claims; replace or approve illustrative imagery and confirm usage rights.
5. **Pending — Release verification:** address the privacy/consent and accessibility findings above, add appropriate automated tests and CI checks, define hosting/security/monitoring procedures, and complete a production smoke test. The project currently has no test script, CI workflow, or deployment/monitoring configuration.
