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

`npm run db:down` stops PostgreSQL without deleting its persistent volume. The schema is an initial local foundation only: the public catalogue and enquiry route do not read from or write to this database. No sample catalogue records are seeded. `npm run db:validate` validates the Prisma schema without applying migrations.

## Routes included

- Home, product catalogue, four flooring collection pages, product details, offers and legacy WordPress product/category redirects
- Installation services, quote request, contact, about, gallery, FAQ, blog index and four article routes
- Local pages for Thornton and Barrie, privacy policy and terms
- Sitemap and robots metadata routes
- Admin dashboard and module design previews are present in source but disabled at the request boundary

## Important integration status

This workspace was empty except for the supplied logo PDF. The current build is a frontend redesign and content/data prototype. The product catalogue uses the sample prices from the brief; product photography is illustrative room-scene imagery. Replace it with licensed product photography and verify current pricing, availability, specifications, service coverage and sale details before launch.

Quote and contact forms submit to a server route, which validates the enquiry, verifies Cloudflare Turnstile, and submits it to Resend. The form reports success only after Resend accepts the request; this does not guarantee final email delivery. Configure `RESEND_API_KEY`, a verified-domain `RESEND_FROM_EMAIL`, `QUOTE_TO_EMAIL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, and server-only `TURNSTILE_SECRET_KEY` in the deployment environment. The `NEXT_PUBLIC_` site key must be available during the build; keep the Turnstile secret and Resend API key server-side only. Restrict the Turnstile site key to the deployed hostnames. Until all values are configured, the endpoint fails closed and the form provides phone/email alternatives. The form does not store leads in this application.

Admin routes are design previews only; no authentication, authorization, or live data integration exists. A server-side Next.js Proxy returns 404 for every `/admin` route, including the preview login page. This is fail-closed containment, not authentication. Keep these routes disabled until a real authentication provider, server-verified sessions, role enforcement, database access controls, rate limiting, audit logging and required security controls are implemented and tested.

## SEO foundations

The project includes route metadata, canonical paths, Open Graph fields, en-CA language, JSON-LD for the local flooring business, products, offers, FAQ and articles, sitemap.xml, robots.txt, legacy product redirects and noindex rules for the admin preview. Review actual legacy URLs and run a full redirect crawl before changing DNS.

The default Open Graph image currently uses the supplied wide logo. Before launch, the business should provide an approved social-preview image (recommended 1200 × 630) and confirm its branding and usage rights; do not substitute unapproved artwork.

## Quality checks

Run after dependency install:

~~~bash
npm run typecheck
npm run lint
npm run build
~~~

See the handoff summary for the checks actually run and their results.
