# Sprint 3.4 — Offline grounding safety regression suite

## Goal

Reduce one class of unsupported catalogue recommendations by extracting the response citation guard from the session endpoint and testing it independently. This is a deliberately narrow, deterministic safeguard.

## Changes

- Block unapproved V CARE product URLs in product-related responses, even when the approved snapshot is empty.
- Block retrieved product names when the corresponding canonical URL is absent.
- Use word boundaries for name matching to reduce accidental substring matches.
- Add offline adversarial tests for missing citations, case variation, unsafe product links, query-string changes, and unrelated greetings.
- Add an authenticated session regression test to ensure rejected links are not persisted in conversation history.

## Limits and review

The guard **does not** detect invented product names without URLs, fabricated stock/prices, or arbitrary external URLs. It cannot prove model responses are factual. Keep the agent prompt constraints and human-reviewed catalogue gate; do not treat this as a substitute for evaluation with a reviewed snapshot.

CI should run Python lint, unit and PostgreSQL/Redis integration tests. No production snapshot is enabled, no frontend change is made, and no deployment or merge is requested.

## Next sprint

Introduce structured, source-backed product recommendation objects and deterministic rendering of canonical links, plus evaluation fixtures for unsupported product claims and multilingual requests.
