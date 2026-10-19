# Repository guidance

## Verified stack

- Next.js 16.4.0 with the App Router
- React and React DOM 19.3.0
- TypeScript 5.9.3 with `strict` enabled

Use the existing App Router, React Server Component, and strict TypeScript patterns. The public catalogue and article content currently come from static files under `src/data/`.

## Before changing code

- Inspect the specific files and nearby call sites relevant to the task before editing.
- Make the smallest complete change; avoid unrelated refactors and new dependencies.
- Run the relevant checks below and add or update focused tests when behavior changes. Vitest is configured for focused unit and route tests.
- Review the final Git diff and confirm that only intended files changed.
- Get approval before destructive operations, installing dependencies, making production changes, or deploying.

## Current implementation limitations

- The static catalogue is sourced from `src/data/` and publishes only records marked `published` with approved image and description reuse status. The authenticated `/admin/catalogue-preview` route shows all draft records and is noindex. Preview access uses server-verified Basic Authentication; `noindex` metadata is not authorization.
- Quote and contact forms validate and verify Turnstile before atomically persisting enquiries and pending notification jobs. The authorized notification worker is implemented, but no scheduler or staging database is configured.
- Catalogue prices and specifications are sample data, and product/room imagery is illustrative. Verify product facts, offers, service coverage, and image rights before launch.
- Product records and publication state are static source data; publishing requires client/supplier reuse authorization for the image and description. PostgreSQL/Prisma remain for enquiry and notification persistence, not for catalogue reads or publication.

## Quality checks

Run from the project root after installing the already-declared dependencies:

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

These are the quality-check scripts defined in `package.json`; rerun the relevant checks after changes. Build and database operations require review of their environment and side effects first.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
