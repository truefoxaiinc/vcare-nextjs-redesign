# Official supplier catalogue sync

This repository's public product catalogue is currently a curated TypeScript dataset. The
sync command discovers product metadata from the **12 client-approved supplier domains**
and writes a reviewable JSON snapshot; it does not silently publish scraped records.

## Run

```bash
npm run catalogue:sync
```

Optional controls:

- `SUPPLIER_SYNC_MAX_PAGES=500` limits product-page requests per supplier.
- `SUPPLIER_SYNC_DELAY_MS=250` sets the delay between page requests.
- `node scripts/sync-supplier-catalogues.mjs path/to/output.json` changes the output path.

Default output: `data/supplier-catalogue-discovery.json`.

## What it imports

The script follows official supplier XML sitemaps (including sitemap indexes and sitemap
locations declared in robots.txt), visits same-domain HTML pages, and extracts Schema.org
`Product` JSON-LD. It retains the canonical source URL, product name, image URL, SKU,
brand, description and supplier-provided offer metadata when present.

It does **not** invent missing fields, infer stock from a price, or treat a missing price as
zero. Product categories are best-effort classifications and records labelled
`Unclassified` need review.

## Important publication boundary

The output is a discovery snapshot, not a production import. Some suppliers expose catalogues
through client-side rendering, PDFs, password-protected dealer portals, or non-standard
product pages; those may not expose JSON-LD and will be listed as needing manual import.
Inspect each supplier's errors and record count before accepting completeness.

Before adding records to `src/data/supplier-product-imports.ts`, deduplicate by supplier and
canonical product URL, verify category/specifications against the supplier page, and confirm
that Vcare has permission to reuse supplier photography and copy. The website's existing
publication gate in `src/data/catalog.ts` must remain in force. Do not commit the generated
snapshot if it contains private dealer data or unapproved media.

The current product explorer reads `publishedProducts` from the curated catalogue; running
this discovery command alone does not change the live storefront. This separation prevents
an incomplete crawl or an incorrect classification from becoming public product data.
