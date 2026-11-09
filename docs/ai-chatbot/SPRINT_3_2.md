# Sprint 3.2 — Review-gated catalogue export

## Scope

This PR adds an **offline** exporter for the real Next.js `publishedProducts` collection, rather than copying product details by hand or scraping supplier websites.

The exporter compiles only the three existing TypeScript data modules in an isolated temporary directory using the project's installed TypeScript compiler. It loads `publishedProducts` from that compiled module, rechecks publication/authorization fields, rejects duplicate/unsafe slugs, and emits the Sprint 3.1 schema with a full Git source commit.

## Generate a candidate snapshot

From a clean checkout at the exact reviewed Git commit:

```bash
npm ci
node scripts/catalogue-export.mjs --out /tmp/vcare-catalogue-review.json
```

The command refuses dirty tracked files, existing output paths, unapproved product metadata and invalid slugs. It prints a SHA-256 checksum, product count, and source commit. It does **not** write into the website or chatbot production directories. CI runs unit tests and an actual export into the runner's temporary directory.

## Mandatory human review and activation

1. Confirm the exported source SHA matches the reviewed website catalogue revision and inspect all product names, supplier references, descriptions and authorization evidence.
2. The existing client-reported permission fields are **not** supplier-issued licensing evidence. Obtain any additional required business/legal approval before exposing descriptions.
3. Validate the output against the Python `CatalogueSnapshot` schema. Verify all canonical product links, count and revocation requirements.
4. Securely copy the approved snapshot to a read-only, isolated backend volume. Set `CATALOGUE_SNAPSHOT_PATH` and `CATALOGUE_SNAPSHOT_SHA256` to the reviewed values, then restart the isolated backend only with explicit deployment approval.
5. On a product revocation, disable or replace the snapshot immediately; a checksum pins content but does not establish ongoing permission.

**No snapshot is bundled or activated by this PR.** No OpenRouter/RAG prompt integration, customer-facing website change, VPS deployment, or merge is performed.

## Remaining next sprint

Implement evidence-grounded product answers in the LLM tool path, no-match fallback, cited product links, lead qualification and evaluation for hallucinations, stock/pricing claims and prompt injection.
