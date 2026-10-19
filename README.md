# Vcare Hardwood Floors — Next.js redesign

Responsive, SEO-focused redesign of the Vcare Hardwood Floors public website. The site is a flooring catalogue and quote-request experience; it does not include online checkout.

## Run locally

Dependency versions were verified from the npm registry on 2026-10-07. The exact versions are pinned in package.json and package-lock.json.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` for the canonical origin. Use Node.js 22.12 or later in the 22.x line as the project baseline.

~~~bash
npm install
npm run db:generate
npm run dev
~~~

## Local database foundation

Use Node.js 22 and Docker Compose. Copy `.env.example` to `.env.local`; its database URL and Compose credentials are for local development only and must never be reused in a deployed environment. Prisma loads the same local environment files as Next.js.

~~~bash
npm install
npm run db:up
npm run db:generate
npm run db:migrate
npm run db:status
~~~

`npm run db:down` stops PostgreSQL without deleting its persistent volume. The public catalogue remains static and no sample catalogue records are seeded. `npm run db:validate` validates the Prisma schema without applying migrations.

## Routes included

- Home, product catalogue, four flooring collection pages, product details, offers and legacy WordPress product/category redirects
- Installation services, quote request, contact, about, gallery, FAQ, blog index and four article routes
- Local pages for Thornton and Barrie, privacy policy and terms
- Sitemap and robots metadata routes
- Authenticated, noindex draft catalogue preview at `/admin/catalogue-preview`; other admin modules remain design previews

## Important integration status

The static catalogue contains 48 supplier-sourced product records. Product prices are not displayed. All records currently remain unpublished because image and description reuse authorization has not been confirmed; review the drafts at `/admin/catalogue-preview`. The client or supplier must authorize each image and description before those records are changed to published. Confirm product specifications and availability before launch.

Quote and contact forms submit to a server route, which validates the enquiry, verifies Cloudflare Turnstile, and atomically stores the enquiry and a pending Resend notification job in PostgreSQL. A successful response means the enquiry and job were committed; it does not mean the email was sent or delivered. Idempotency keys are retained by the form across retries and prevent duplicate records for the same submission key. The Turnstile token is not persisted.

Configure `DATABASE_URL`, `RESEND_API_KEY`, a verified-domain `RESEND_FROM_EMAIL`, `QUOTE_TO_EMAIL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, server-only `TURNSTILE_SECRET_KEY`, and server-only `NOTIFICATION_WORKER_SECRET` in the deployment environment. The public Turnstile site key must be available during the build; keep all other keys server-side. Restrict the site key to deployed hostnames. Without the Turnstile configuration, submissions fail closed; without database access, they are not acknowledged as accepted.

The worker endpoint is `POST /api/internal/notification-worker` and requires `Authorization: Bearer <NOTIFICATION_WORKER_SECRET>`. Each invocation handles at most one email job, claims work transactionally with PostgreSQL `FOR UPDATE SKIP LOCKED`, and uses a 60-second processing lease. Retryable network, timeout, HTTP 408, HTTP 429 and HTTP 5xx failures use bounded exponential backoff with jitter and at most eight attempts. Permanent failures and exhausted jobs are retained as dead letters; retryable dead letters can be manually re-queued through `POST /api/internal/notification-replay/<jobId>` using the same server-only bearer secret. Review/fix the cause before replaying.

No Vercel project association, Cron configuration, or staging deployment/database is present in the local repository, so a scheduler is **not configured or verified**. Before production, confirm the hosting platform and its function-duration limits, provision a separate staging database, then schedule authenticated POST requests to the worker endpoint at a cadence that meets the required email latency. The endpoint also purges at most 100 enquiries older than 90 days per invocation, but never removes enquiries with pending or processing jobs. Unresolved queued notifications can therefore retain personal data beyond 90 days; monitor and resolve them. Notification-job and attempt metadata contain no enquiry body and are retained after enquiry deletion.

Provider timeouts are ambiguous: Resend may have accepted an email before the worker timed out. Retrying can send a duplicate; this implementation does not claim exactly-once delivery. Provider acceptance is recorded as an attempt but is not proof of final inbox delivery.

The public catalogue is static: product records live in `src/data/catalog.ts` and `src/data/supplier-product-imports.ts`. Only products with `publicationStatus: 'published'`, image and description reuse statuses set to `approved`, a verified supplier source, and separate `...AuthorizedBy`, `...AuthorizedAt`, and `...AuthorizationReference` evidence fields appear publicly. All current products remain drafts pending client/supplier permission; do not change these fields until permission is documented. No product route, public listing, detail page or sitemap requires PostgreSQL, Prisma, `DATABASE_URL`, or a catalogue migration. Use `/admin/catalogue-preview` to review all 48 drafts; it is marked noindex and protected by server-verified HTTP Basic Authentication (`ADMIN_USERNAME`, `ADMIN_PASSWORD`). Other admin modules remain design previews. Missing credentials fail closed with 404; invalid credentials receive a 401 challenge. Use this only over HTTPS. The catalogue preview is read-only; authorized static data changes are made through reviewed source edits and redeployed.

### Vercel environment

Configure these variables separately for Preview and Production in Vercel. Use unique values per environment, and never expose server-only values with a `NEXT_PUBLIC_` prefix:

- Static public catalogue: no database or secrets are required. `NEXT_PUBLIC_SITE_URL` sets its canonical origin.
- Private draft preview: `ADMIN_USERNAME` (no colon) and `ADMIN_PASSWORD` (long, unique secret); serve over HTTPS.
- Quote submission and notification delivery: `DATABASE_URL` (hosted PostgreSQL connection string with provider-required TLS), `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (verified sender), `QUOTE_TO_EMAIL`, and `NOTIFICATION_WORKER_SECRET` (long, random server-only secret).
- Optional: `NEXT_PUBLIC_GTM_ID` and `NEXT_PUBLIC_GA4_ID` only when analytics is enabled and consent behavior has been reviewed.

Set the public Turnstile site key for the production and preview hostnames in Cloudflare. All other listed secrets are server-only. Keep Preview and Production databases separate; do not copy production credentials into Preview.

The product catalogue has no migrations. The existing quote/email outbox still uses PostgreSQL and Prisma. Do not run migrations automatically from every serverless build. Back up that database, apply and verify the existing enquiry/outbox migrations against staging, then run the following once against the intended production `DATABASE_URL` from a controlled release environment:

~~~bash
npm ci
npm run db:generate
npx prisma migrate deploy
npm run db:status
~~~

The enquiry/outbox database requirement is separate from the catalogue. Public product routes continue to work if the quote database is unavailable; online enquiry submission does not. Confirm authorization for each image and description before changing its static record to published.

## SEO foundations

The project includes route metadata, canonical paths, Open Graph fields, en-CA language, JSON-LD for the local flooring business, products, offers, FAQ and articles, sitemap.xml, robots.txt, legacy product redirects and noindex rules for the admin preview. Review actual legacy URLs and run a full redirect crawl before changing DNS.

The default Open Graph image currently uses the supplied wide logo. Before launch, the business should provide an approved social-preview image (recommended 1200 × 630) and confirm its branding and usage rights; do not substitute unapproved artwork.

## Quality checks

Run after dependency install:

~~~bash
npm run typecheck
npm run lint
npm test
npm run build
~~~

Focused unit and route tests use Vitest and mock Turnstile, Resend, and the persistence boundary. Database concurrency, migration, and retention behavior still require verification against a confirmed disposable PostgreSQL database. No production database has been connected to or migrated by this implementation.

## Staging, operations, and rollback

1. Provision a staging deployment and a PostgreSQL database separate from production. Configure only staging credentials there.
2. Take a verified backup and test restoration before any production migration. Apply the additive migration to staging first; production migration execution requires separate approval.
3. Confirm the scheduler, request cadence, function timeout, retry monitoring, and owner for manual replay/dead-letter alerts. The repository does not configure a scheduler.
4. Monitor worker response counts and `NotificationJob`/`NotificationAttempt` status without logging enquiry contents. Review privacy notice and retention requirements with the data owner.
5. For rollback, first stop scheduling the worker, preserve pending job rows, roll back application code only if compatible with the additive schema, and do not drop the new tables/columns while queued work or attempt history remains. Resume scheduling only after the compatible application version is deployed.
