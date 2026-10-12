# Production-readiness checklist

Status means: **Verified** is supported by repository inspection or a recorded command result; **Pending** has not been completed or lacks evidence; **Not applicable** is used only where the current documented scope makes an item unnecessary.

## Customer and catalogue readiness

- **Implemented; production setup pending** — Quote/contact submissions are validated server-side, checked with Cloudflare Turnstile, and sent to Resend. The endpoint reports provider acceptance, not final delivery. Configure the Resend sender, API key and recipient, plus Turnstile site/secret keys; verify domain setup, email delivery, spam controls, and failure handling in production. The app does not persist enquiries.
- **Verified containment; authentication pending** — The Next.js Proxy returns 404 for every `/admin` route, including `/admin/login`. No authentication or authorization system exists. Keep these routes disabled until a real authentication provider, server-verified sessions, role enforcement and access controls are implemented and tested.
- **Pending** — Verify catalogue prices, specifications, availability, sale terms, service coverage, and other customer-facing claims against current business records.
- **Pending** — Replace illustrative imagery with approved, appropriately licensed product imagery.

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
- **Pending** — Add focused automated tests; no test files or test script were found in the project audit.
- **Pending** — Configure CI/CD to run appropriate checks and control production releases; no project CI workflow was found.
- **Pending** — Review and configure security headers for the hosting environment. The app sets several baseline headers in `next.config.mjs`; a Content Security Policy was not found.
- **Pending** — Define production logging, monitoring, alerting, and incident ownership; no project monitoring setup was found.
- **Pending** — Document and verify the deployment environment, required environment variables, secrets management, and release/rollback process. No Docker or deployment configuration was found.
- **Pending** — Run a production smoke test after deployment: verify critical public routes, mobile navigation, enquiry delivery, redirect behavior, analytics consent, and admin protection.

## Phase 1 — Git safety and first-release scope

The project folder `C:\Users\USER\Downloads\vcare-nextjs-redesign` now has its own local Git repository on `main`, with `origin` configured for the intended GitHub repository. At the time the remote was checked, it was empty. Keep all Git operations scoped to the project directory; do not stage or clean the parent repository, which contains files outside this project.

Package scripts are `dev`, `build`, `start`, `lint`, and `typecheck`; no test script was found. The app is a frontend prototype: product/article data is local, filters and the area calculator run in the client, quote/contact submissions use the Resend API when configured, and admin pages are static preview UI. The other existing route handlers implement legacy redirects. `.env.example` lists database and authentication settings, but no database/auth integration was found in the source.

Top first-release blockers, based on repository evidence:

1. **Pending — Git safety:** establish a project-scoped repository/worktree and review its status before any staging or release operation.
2. **Verified containment; pending — Admin authentication:** all `/admin` routes fail closed with 404 at the server request boundary. Do not remove this block until a real authentication provider, server-verified sessions and authorization policy are implemented and tested. `noindex` is not authorization.
3. **Implemented; pending production setup — Enquiries:** configure Resend and Turnstile credentials and verified sender domain; verify actual delivery, failure handling, and deployment-level abuse controls.
4. **Pending — Customer-facing data and media:** verify product prices, specifications, availability, offers, and service claims; replace or approve illustrative imagery and confirm usage rights.
5. **Pending — Release verification:** address the privacy/consent and accessibility findings above, add appropriate automated tests and CI checks, define hosting/security/monitoring procedures, and complete a production smoke test. The project currently has no test script, CI workflow, or deployment/monitoring configuration.
