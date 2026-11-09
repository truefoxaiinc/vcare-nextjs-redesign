# Sprint 3.6 — Conservative multilingual catalogue retrieval

## Purpose

Support common Malayalam and Manglish flooring category questions without an LLM translation call. The same deterministic query normalization is used for authenticated chat grounding and structured recommendation cards.

## Implementation

- Curated category aliases for vinyl, laminate, hardwood and engineered flooring.
- Malayalam flooring-intent detection, including general floor-related questions.
- English query behavior retained; unknown Malayalam expressions are not guessed.
- Category aliases only select from the existing SHA-256-pinned, reviewed catalogue; they cannot add products, URLs, pricing or availability.
- Unit tests for category aliases, Malayalam greetings, unknown expressions, and verified-only category search.

## Limitations

This is not general multilingual understanding, translation or semantic search. Transliteration is intentionally narrow. A generic Malayalam flooring question may trigger the catalogue gate but return no product matches; the assistant must then avoid naming specific products.

## Review and rollout

- Python Ruff and PostgreSQL/Redis test CI must pass.
- Next.js checks must pass.
- No production configuration, frontend widget or snapshot activation changes.
- Review vocabulary with Malayalam-speaking staff before expanding aliases; do not auto-learn mappings from user inputs.

## Next

Feature-flagged frontend product cards and session integration after API security review and staging deployment.
