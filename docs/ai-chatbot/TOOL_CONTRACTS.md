# Agent Tool Contracts (design, not implemented)

Every tool is server-side, allowlisted, schema-validated, logged with request ID and least privilege. The LLM cannot run arbitrary SQL, shell commands, external URLs or email sends.

## search_catalogue
Input: `{query: string, category?: string, limit?: integer}` (bounded limit). Output: published/approved product records `[{name, category, supplier?, url, verified_attributes, source_version}]`. Exclude draft and unlicensed records; do not return sample prices as verified.

## search_knowledge
Input: `{query: string, limit?: integer}`. Output: `[{text, source_url, document_id, revision, publication_status}]`. Filter to approved public sources; reject stale/revoked versions.

## update_sales_state
Input: validated subset of sales state with explicit source message. Output: normalized state and missing fields. No arbitrary key/value writes or contact information without consent.

## prepare_quote
Input: `{rooms?, area?, project_type?, product?, timeline?, details?}`. Output: validated **prefill only** plus review URL. No autonomous submission. Contact fields supplied only by customer and handled by existing form.

## request_human_handoff
Input: `{reason, customer_consent}`. Output: approved contact method or existing contact page; never promise callback or appointment without a confirmed workflow.

## Operational constraints
Enforce per-session authorization, timeouts, retries only for safe reads, bounded tool calls, deterministic URL allowlist and sanitized outputs. Separate model-generated suggestions from authoritative tool results. Failed tools yield uncertainty and safe escalation.
