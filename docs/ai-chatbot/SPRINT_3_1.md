# Sprint 3.1 — Approved catalogue retrieval foundation

## What this PR delivers

A deterministic, read-only product search endpoint in the isolated FastAPI backend:

`GET /api/v1/chat/sessions/{session_id}/catalogue?q=oak`

Requires the existing session bearer token; verifies session ownership and expiry; applies the existing Redis IP and session rate limits. Returns product name, slug, category, supplier, approved description, canonical URL, and the source commit. It does **not** invoke OpenRouter, expose drafts, or automatically use retrieved text in model prompts.

## Source of truth and publication safety

The Next.js catalogue uses `publishedProducts` from `src/data/catalog.ts`. Do **not** parse TypeScript with Python or infer approval from supplier websites. An explicit, reviewed export from the actual `publishedProducts` collection must be generated and checked against the production visibility rules before enabling this backend.

The backend accepts only a local JSON snapshot with:
- `schema_version: 1`
- `source_commit`: the exact 40-character Git SHA of the Next.js catalogue export
- `products`: an array of records with `slug`, `name`, `category`, `supplier`, `description`, `canonical_url`, `publication_status`, `source_status`, `description_authorization_status`, `description_authorization_reference`, `image_authorization_status`, `image_authorization_reference`.

All records must be published, verified and approved. Canonical URLs must be HTTPS and point to `/products/{slug}` on `www.vcarehardwoodfloors.ca` or `vcarehardwoodfloors.ca`. This is an **additional** backend validation layer, not a replacement for the frontend's publication checks.

Configure `CATALOGUE_SNAPSHOT_PATH` and `CATALOGUE_SNAPSHOT_SHA256` only after manually reviewing the generated snapshot and computing its SHA-256 digest. Without both values, the endpoint returns an empty result set. A missing, tampered or invalid snapshot returns 503, not unverified content.

No snapshot or source data is bundled or activated by this PR. No catalogued products are asserted as available or priced.

## Operational limitations and follow-up

This sprint establishes a grounding boundary, not full RAG. Before the sales LLM can recommend specific products, implement an approved export process with source SHA, authorization metadata and revocation checks, and integrate retrieval as a constrained tool with evidence-backed answer evaluation. Handle snapshot rotation atomically; reject stale/revoked data. Add staging integration and abuse/load tests.

Existing Next.js routes, Vercel behavior, and the unauthenticated legacy chat 410 contract remain unchanged. No VPS deployment, merge, or production changes are part of this PR.
