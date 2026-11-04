# Sprint 3 — Installation gallery performance and accessibility

Issue #13 (partial), with #12 performance review.

## Changes
- All 16 gallery images load lazily because the gallery appears after the hero and service sections; avoid requesting the first two below-the-fold images eagerly.
- Responsive `sizes` follows the existing three-column desktop and two-column mobile gallery CSS to reduce oversized downloads.
- Captions receive a gradient backdrop for readability across light and dark photographs; descriptive `alt` text remains intact.

## Verification required before closing issues
- Run CI, build, mobile/desktop Lighthouse, WebPageTest or equivalent and measure LCP/CLS/image transfer sizes. Check 320px, 375px, 768px, 1024px and desktop layouts in real browsers.
- Confirm all 16 images' copyright/permission and accurate descriptions with the site owner; source files alone are **not** usage-rights evidence.
- Confirm that photos do not imply Vcare completed a pictured project unless independently verified.
- Check keyboard navigation, captions, image rendering on slow connections and reduced-motion preferences.
- Do not mark Core Web Vitals or gallery rights verified without actual evidence.

No dependencies, production environment or unrelated projects were changed.
