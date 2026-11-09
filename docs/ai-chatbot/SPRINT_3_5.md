# Sprint 3.5 — Source-backed structured recommendation cards

## Endpoint

`GET /api/v1/chat/sessions/{session_id}/recommendations?q=oak`

Requires the existing bearer session token. Applies session isolation, IP and session rate limits. No OpenRouter call is required: recommendation cards are created deterministically from the already-reviewed, SHA-256-pinned catalogue snapshot.

## Contract

Response contains `products` (up to three cards with slug, name, category, supplier, approved description and canonical URL), `source_commit`, and `evidence_status`:

- `unavailable`: no reviewed snapshot configured; returns an empty list.
- `no_match`: reviewed snapshot loaded but no search hits.
- `matched`: approved product cards found.

A missing, invalid or modified configured snapshot returns HTTP 503. No price, stock, discount, delivery promise, warranty or quote fields are generated. The frontend can render product cards directly from this contract instead of parsing LLM text.

## Safety and rollout

This endpoint does not activate a snapshot, change the existing frontend or perform lead capture. Cards are based on deterministic keyword search, not personalized suitability judgments. Do not display them as confirmed stock or sales offers.

## Review gates

- Python lint, unit and integration CI pass.
- Confirm cross-session access denial and checksum tamper tests.
- Human review approved catalogue export and canonical URL permissions before configuration.
- Next: frontend integration behind a feature flag and multilingual retrieval evaluation.
