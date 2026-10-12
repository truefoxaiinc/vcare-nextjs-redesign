# Repository guidance

## Verified stack

- Next.js 16.4.0 with the App Router
- React and React DOM 19.3.0
- TypeScript 5.9.3 with `strict` enabled

Use the existing App Router, React Server Component, and strict TypeScript patterns. The public catalogue and article content currently come from static files under `src/data/`.

## Before changing code

- Inspect the specific files and nearby call sites relevant to the task before editing.
- Make the smallest complete change; avoid unrelated refactors and new dependencies.
- Run the relevant checks below and add or update focused tests when behavior changes. There is currently no test script or test suite configured.
- Review the final Git diff and confirm that only intended files changed.
- Get approval before destructive operations, installing dependencies, making production changes, or deploying.

## Current implementation limitations

- Admin pages under `src/app/admin/` are design previews and currently have no access control. `noindex` metadata is not authorization. Do not treat them as production-operational or expose them as a live admin.
- Quote and contact forms currently construct `mailto:` links. They do not reliably submit to or store enquiries on a server.
- Catalogue prices and specifications are sample data, and product/room imagery is illustrative. Verify product facts, offers, service coverage, and image rights before launch.
- This repository is a frontend prototype; do not assume a database, authentication, CMS, or live API exists.

## Quality checks

Run from the project root after installing the already-declared dependencies:

```sh
npm run typecheck
npm run lint
npm run build
```

These are the quality-check scripts defined in `package.json`. They were reported passing in the repository audit; rerun the relevant checks after changes. No automated test command is currently defined.
