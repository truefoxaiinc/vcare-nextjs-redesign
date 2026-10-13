# Phase 2B: Database-backed catalogue proposal

## Current state

Public product and category pages read sample records from `src/data/catalog.ts`. Product/category detail pages, metadata, canonical URLs, JSON-LD and sitemap entries are derived from those records. The home page selects featured products by array position, offers are selected by a non-null prior price, and catalogue search/filter/sorting is client-side. The product and category models exist in Prisma, but public pages do not use the database. Records default to `DRAFT`; no seed data was found.

The project identifies current prices and specifications as sample data and room-scene images as illustrative. Do not import or publish those values as real catalogue data.

## Page-to-data mapping

| Surface | Current source | Proposed access |
|---|---|---|
| Home (`src/app/page.tsx`) | Static categories/products; featured items selected by array index | Published products/categories with explicit ordering and featured selection |
| Catalogue (`src/app/products/page.tsx`) | Static products passed to `ProductExplorer` | Server-loaded published products and categories; retain the existing client-side search, filters and sorting |
| Category/product (`src/app/products/[slug]/page.tsx`) | Static slug lookup for page, metadata, category filtering, related items and JSON-LD | Resolve published category/product by the unchanged slug; fetch same-category related products |
| Product cards (`src/components/product-card.tsx`) | Shared display type and illustrative image alt text | Adapt database records to the existing card shape and use approved image alt text |
| Offers (`src/app/offers/page.tsx`) | Products with a static `was` price | Published products with an approved active offer |
| Sitemap (`src/app/sitemap.ts`) | Static product/category slugs | Include only published database slugs; retain static and blog entries |

Legacy redirects, fixed navigation links, quote flow and blog data need no database reads for this scope.

## Compatibility and operational risks

- Preserve existing `/products/[slug]` URLs, including legacy or misspelled slugs. They are used in canonical/Open Graph metadata, breadcrumbs, quote links, structured data and the sitemap.
- Keep page layout, metadata, responsive behavior and current search/filter interactions. Preserve deliberate product ordering and homepage merchandising; database query order must not become the design.
- `generateStaticParams` currently uses static product and category slugs. Request-time database reads are the safer initial policy to avoid build-time dependency on the database; choose and implement a compatible sitemap/cache policy.
- The current `wasPrice` field has no date semantics, while offers and Offer JSON-LD treat it as active. Confirm its meaning before showing an item as a current offer.
- The client explorer has a fixed category list and the product type assumes four category names. The database mapping must retain these names and provide category counts without changing the user experience.
- Product-not-found currently calls `notFound()` and search already has an empty state. There is no catalogue loading or database-error UI. Add explicit loading/error behavior; never silently fall back to sample products on a database failure.
- The models cover the current product fields, but homepage feature selection and stable sorting need explicit ordering/featured data.

## Verified-data import

First obtain an authoritative catalogue source and approval for slugs, names, categories, prices, sale status, specifications, and product images/rights/alt text. Import only this verified source—not the static arrays. Keep imported records as `DRAFT` for review and publish only approved records. Preserve source provenance for the import. No import or database change is part of this proposal.

## Smallest safe sequence

1. Confirm the authoritative data source, existing slug mapping, offer semantics and rendering/cache policy.
2. Add explicit ordering and featured fields if needed, with an additive migration.
3. Add a server-only published-record query/mapping layer using the existing Prisma client.
4. Wire the homepage, catalogue, detail/category pages, offers and sitemap; preserve routes and metadata. Add catalogue loading and database-error UI.
5. Validate published/draft filtering, slugs and not-found, category counts/filtering, ordering/featured products, offers, related products, sitemap output and database failures. Run `npm run typecheck`, `npm run lint` and `npm run build` against a non-production environment.

There is no configured test script or existing test suite; focused tests should be added for the query/mapping behavior if a test runner is approved/configured.

## Proposed files

- `prisma/schema.prisma` — explicit catalogue ordering and featured selection.
- `prisma/migrations/<new-phase2b-migration>/migration.sql` — additive schema change; do not apply as part of this proposal.
- `src/lib/catalog-data.ts` — new server-only published catalogue query and Prisma-to-UI mapping.
- `src/data/catalog.ts` — remove product/category sample arrays from the live data path while retaining unrelated blog data and shared helpers/types.
- `src/app/page.tsx` — database-backed homepage categories and curated products/offers.
- `src/app/products/page.tsx` — load catalogue data on the server.
- `src/app/products/[slug]/page.tsx` — database-backed category/product resolution, metadata and related products.
- `src/app/offers/page.tsx` — query approved active offers.
- `src/components/catalog-ui.tsx` — receive category data while preserving current client interactions.
- `src/components/product-card.tsx` — consume the mapped fields and verified image alt text.
- `src/app/sitemap.ts` — source product/category paths from published records.
- `src/app/products/loading.tsx` and `src/app/products/error.tsx` — new loading and explicit database-error handling.

## Decisions requiring approval

1. What authoritative catalogue source and approver should be used for product facts and image rights?
2. Does `wasPrice` mean an active offer, or should offers have effective dates?
3. Approve request-time database rendering initially, instead of build-time/static catalogue generation?
