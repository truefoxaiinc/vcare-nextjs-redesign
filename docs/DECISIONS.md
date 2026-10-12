# Project decisions

## 2026-10-07 — Website redesign baseline

- Use Next.js App Router, React Server Components and strict TypeScript for the new site.
- Keep Vcare’s existing catalogue plus quote-request model; do not add cart, customer accounts or checkout.
- Use the uploaded Vcare logo, rendered locally from the supplied PDF. The mark uses warm orange and peach tones; the UI pairs those accents with cream, walnut and charcoal.
- Preserve known product and article slugs where possible. Put product details at /products/[slug], collections at /products/[category], and redirect legacy /product/[slug] and /product-category/[category] paths.
- Use only Thornton and Barrie service-area landing pages until Vcare confirms other served locations.
- Avoid invented reviews, ratings, guarantees and service promises.
- Use locally available system fonts to avoid remote font requests and layout shift.
- Keep media images illustrative in this prototype. Replace them with licensed, verified product imagery before launch.
- Quote/contact form delivery, CMS, user management and database services are not connected in this frontend workspace. Do not describe these routes as production-operational.
- Registry-verified package versions were pinned on 2026-10-07 and locked in package-lock.json.

## SEO implementation choices

- Generate metadata and canonical URLs from the Next.js Metadata API.
- Generate the sitemap from the current route data and exclude admin routes.
- Add JSON-LD only for business facts and page/product data supported by this project.
- Add noindex metadata for admin preview routes.
- Keep old blog slugs intact; review all incoming links and WordPress export URLs before migration.
