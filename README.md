# Vcare Hardwood Floors — Next.js redesign

Responsive, SEO-focused redesign of the Vcare Hardwood Floors public website. The site is a flooring catalogue and quote-request experience; it does not include online checkout.

## Run locally

Dependency versions were verified from the npm registry on 2026-10-07. The exact versions are pinned in package.json and package-lock.json.

~~~bash
npm install
npm run dev
~~~

Set NEXT_PUBLIC_SITE_URL in .env.local for the canonical origin. See .env.example.

## Routes included

- Home, product catalogue, four flooring collection pages, product details, offers and legacy WordPress product/category redirects
- Installation services, quote request, contact, about, gallery, FAQ, blog index and four article routes
- Local pages for Thornton and Barrie, privacy policy and terms
- Sitemap and robots metadata routes
- Admin dashboard and module design previews under /admin

## Important integration status

This workspace was empty except for the supplied logo PDF. The current build is a frontend redesign and content/data prototype. The product catalogue uses the sample prices from the brief; product photography is illustrative room-scene imagery. Replace it with licensed product photography and verify current pricing, availability, specifications, service coverage and sale details before launch.

Quote and contact forms prepare an email in the visitor’s email application. They do not save leads or send mail from the website. Admin routes are design previews only and have no authentication, database or live data. Do not deploy the admin preview publicly until Auth.js, role enforcement, database access, rate limiting, audit logging and required security controls are implemented and tested.

## SEO foundations

The project includes route metadata, canonical paths, Open Graph fields, en-CA language, JSON-LD for the local flooring business, products, offers, FAQ and articles, sitemap.xml, robots.txt, legacy product redirects and noindex rules for the admin preview. Review actual legacy URLs and run a full redirect crawl before changing DNS.

## Quality checks

Run after dependency install:

~~~bash
npm run typecheck
npm run lint
npm run build
~~~

See the handoff summary for the checks actually run and their results.
