# Legacy WordPress redirect verification — Sprint 3

Issue #3. This change adds automated regression tests for **existing** redirect behavior. It does not claim that the current mapping covers every historical URL.

## Currently covered in code
- `/product/[slug]` → `/products/[slug]` (301; original query string preserved).
- `/product-category/[category]` → known category routes; unknown category → `/products` (301).
- The category map is deliberately explicit, avoiding a destination supplied by the request.

## Prelaunch audit required
1. Export historical URLs from WordPress XML sitemap, Google Search Console, analytics and any available access logs. Record source and date.
2. Crawl actual old URLs and verify the target is relevant, returns 200, is canonical and is not a redirect chain.
3. Product slugs must be verified against the current published catalogue. A generic product-slug redirect can otherwise send visitors to a 404 or an unpublished product.
4. Review trailing slashes, query parameters, encoded paths, case differences, taxonomy archives, paginated pages, blog links and backlinks.
5. Do not invent mappings or redirect all missing URLs to the homepage. Add verified mappings and tests in a separate PR.
6. Test redirects on the actual production hostname before changing DNS; preserve evidence and obtain site-owner signoff.

No DNS, hosting, database or production changes were made. #3 remains open until the historical URL audit is completed.
