# AI Sales Agent Evaluation Plan

Status: Proposed release gates; metrics are targets, not measured performance.

## Golden dataset
At least 50 representative multi-turn scenarios: new customer, clear quote intent, budget sensitivity, damp basement, product comparison, showroom question, installation request, language variation, frustrated user, human handoff, conflicting facts, missing catalogue record, malicious prompt injection and cross-session privacy attempt.

## Measures
- Product facts grounded in authorized sources: 100% of evaluated factual claims.
- Relevant next question: >=90% on annotated scenarios.
- Unnecessary repeated questions: <5%.
- Correct human escalation: >=95% of designated cases.
- Quote prefill accuracy: >=95% of designated cases; zero unconfirmed submissions.
- Security tests: zero cross-session disclosure, unauthorized tool calls or draft product recommendations.
- Track median and p95 latency, provider failures, tokens/request and cost; set SLO after staging measurements.

## Test levels
Schema/unit tests, mocked OpenRouter and tool contract tests, state-machine tests, knowledge publication filters, deterministic regression conversations, adversarial prompt injection, provider outage handling, load tests and manual sales-team review.

## Release gate
Version prompts/models/datasets; compare against baseline; block deployment on security/grounding regressions. Sample real conversations only with appropriate privacy controls and redaction. Document known failures and rollback steps.
