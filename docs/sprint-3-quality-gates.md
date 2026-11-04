# Sprint 3 — CI and technical SEO quality gates

Issues: #3, #9, #11, #12, #13, #14. This PR implements a first repository-only subset of #9 and #11.

## Implemented
- GitHub Actions workflow on PRs and main pushes: locked npm install, Prisma generation, TypeScript, ESLint, Vitest and production build.
- Read-only permissions, no repository secrets, no database migrations or deployments, and concurrent-run cancellation.
- Tests for duplicate sitemap entries, canonical origin, public-only paths, published product URLs and robots exclusions.

## Outstanding
- Verify workflow runs green in GitHub Actions; branch protection is an owner setting, not applied here.
- Audit exact historical WordPress URLs from Search Console/sitemap/backlinks before changing redirects (#3).
- Validate JSON-LD and real deployment canonical/robots/HTTP behavior (#11).
- Run Lighthouse/Core Web Vitals and WCAG testing (#12), verify 16 installation photo rights/layout (#13), and test analytics revocation (#14).
- Review dependency advisories and secret scanning; CI checks do not substitute for a security audit.

## Guardrails
No production environment, DNS, hosting, database, catalogue publication state or other project is changed. Do not mark Sprint 3 complete until remaining acceptance criteria are verified.
