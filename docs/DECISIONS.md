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
- Quote/contact form delivery is not persisted by this application; CMS, user management and live database access are not integrated into request handling. Do not describe these routes as production-operational.
- Registry-verified package versions were pinned on 2026-10-07 and locked in package-lock.json.

## 2026-10-12 — Local database foundation

- Use PostgreSQL with Prisma 7 and its `pg` driver adapter; support Node.js 22.12 or later within the 22.x line.
- Run PostgreSQL through localhost-only Docker Compose for development. Keep database access server-only and do not connect public routes, import sample catalogue data, or enable admin routes in this foundation phase.
- Keep catalogue records draft by default; store specifications as JSON and one image URL/alt-text pair per category or product.
- Preserve notification-attempt records when an enquiry is deleted by clearing their optional enquiry relation.

## SEO implementation choices

- Generate metadata and canonical URLs from the Next.js Metadata API.
- Generate the sitemap from the current route data and exclude admin routes.
- Add JSON-LD only for business facts and page/product data supported by this project.
- Add noindex metadata for admin preview routes.
- Keep old blog slugs intact; review all incoming links and WordPress export URLs before migration.
