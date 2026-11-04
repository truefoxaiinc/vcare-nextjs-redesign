# Sprint 3 — Performance baseline and accessibility verification

Issues #12 and #13. This PR adds a **source-asset budget** as a low-cost CI safeguard; it does **not** measure Core Web Vitals or prove WCAG compliance.

## Verified from the repository tree (2026-11-04)
- Installation gallery: 16 JPEG files.
- Total source bytes: 1,439,627 (~1.37 MiB).
- Largest file: 142,481 bytes.
- The site uses Next.js `Image` for gallery rendering and existing responsive `sizes` and lazy loading.

## CI budget
- Max single installation image: 250 KiB.
- Max installation gallery source total: 3 MiB.
- Max gallery image count: 16.
- These are regression thresholds, **not** recommended LCP budgets; Next.js may serve transformed variants and browsers may fetch only visible images.
- If the gallery legitimately expands, review and revise the count threshold explicitly rather than silently bypassing the check.

## Required real-browser audit
1. On a **staging** deployment, capture mobile and desktop Lighthouse reports for home, products, product details, installation services, quote, contact and blog.
2. Record LCP, INP (using field data where available), CLS, TTFB, image request count and transferred bytes. Do not report lab TBT as field INP.
3. Run axe-core or equivalent WCAG checks, then keyboard, screen reader, zoom and contrast manual tests.
4. Check forms and cookie consent for error announcement, focus order and keyboard access.
5. Compare against performance goals (field p75: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1) where field data exists. Do not claim a pass without measured evidence.
6. Obtain image-rights approval separately. Size and lazy loading do not prove licensing.

## Boundaries
No staging site, browser measurement, dependency installation, production deployment or server changes were performed. CI must run green before merge.
