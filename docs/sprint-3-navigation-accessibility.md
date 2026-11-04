# Sprint 3 — Navigation accessibility checkpoint

Issue #12 (partial). Changes are intentionally limited to the existing header and breadcrumb components.

- Mobile menu summary now announces "Toggle navigation menu" instead of always saying "Open navigation menu" after the native `details` element is expanded.
- Decorative hamburger strokes and breadcrumb separators are hidden from assistive technology.
- The keyboard-focused menu summary has a visible outline; the open state has a visual indicator.
- The native `details/summary` control retains built-in keyboard behavior. Desktop dropdown already supports `:focus-within`.

## Manual acceptance checks still required
1. Keyboard-only: tab through desktop and mobile menus; activate menu with Enter/Space; verify focus indicators and logical order.
2. Screen readers: VoiceOver/Safari and NVDA/Chrome; check expanded/collapsed announcement and breadcrumb navigation.
3. Mobile at 320px, 375px, 768px; zoom to 200% and 400%; verify no clipping/overlap with cookie and chat controls.
4. Run automated axe/WCAG scans and record violations; test all forms, dialogs, gallery, contrast and reduced-motion behavior.
5. Review page-wide accessibility before closing #12. This small PR is **not** a WCAG compliance claim.

No dependencies, deployment, content publication or infrastructure changes.
