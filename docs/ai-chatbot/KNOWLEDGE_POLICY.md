# Knowledge, RAG and Grounding Policy

## Approved sources
Published, reuse-authorized product entries from the active Next.js `src/data` catalogue; public FAQ; approved installation services and business information. Verify current runtime publication rules, permissions and URLs before ingestion.

## Exclusions
Draft catalogue, `/admin/catalogue-preview`, internal credentials, customer enquiries, private chats, unapproved images/descriptions, illustrative prices/specifications and unsourced marketing claims.

## Ingestion
Create a versioned export with source commit SHA, publication status, rights metadata, canonical URL and content hash. Validate against website visibility; atomically activate a new index after checks. Remove revoked/unpublished entries from retrieval and invalidate caches.

## Retrieval
Use deterministic structured catalogue search for product attributes; use pgvector RAG for approved prose. Apply metadata filters before retrieval. Return source identifiers to response validator; no citation means no confident factual assertion. Never let retrieved documents override system/tool policy.

## Answer rules
State unknowns plainly. Refer customers to staff for live stock, final pricing, moisture/subfloor suitability, warranties and installation timing. Do not infer product availability from an image or supplier logo.
