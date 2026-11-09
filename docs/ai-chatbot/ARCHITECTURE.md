# V CARE AI Sales Agent — Architecture (proposed)

Status: Sprint 0 design; no chatbot backend has been deployed.

## Goals and boundaries
- Natural, transparent AI flooring sales consultation; product discovery; quote-form handoff; human escalation.
- Separate private `vcare-ai-chatbot-backend` Python FastAPI repository and isolated VPS Docker Compose project.
- Existing Next.js website, Prisma enquiry database, Turnstile, idempotency and notification worker remain authoritative and unchanged until an approved integration PR.
- The public catalogue currently originates from approved static `src/data` records, not the enquiry database. Never index drafts or unapproved supplier assets. Prices/specifications may be illustrative and must not be quoted as verified facts.

## Request flow
Browser widget (future) -> same-origin Next.js proxy (future) -> FastAPI security/session layer -> conversation orchestrator -> approved read-only catalogue / RAG tools -> OpenRouter -> structured response validation -> visitor.

## Backend modules
`api/` request contracts; `agent/` deterministic orchestration, state and response policy; `llm/` OpenRouter adapter; `tools/` allowlisted business operations; `knowledge/` publication-aware ingestion and retrieval; `persistence/` SQLAlchemy/Alembic; `core/` security, config, telemetry.

## Deployment
Python 3.12, FastAPI, PostgreSQL with pgvector when RAG is introduced, Redis for rate limits, OpenRouter via server-side API key, Docker on Ubuntu VPS. Localhost-only staging port subject to conflict check. Dedicated database/schema and credentials; no shared stack restarts or firewall changes without review. Production deployment is out of scope for Sprint 0.

## Non-goals for Sprint 1
No autonomous multi-agent swarm, direct catalogue DB writes, quote submission bypass, website UI changes, public endpoint exposure or live CRM actions.

## Delivery sequence
Sprint 0: docs and review. Sprint 1: API, secure sessions, OpenRouter adapter, tests. Sprint 2: conversation policy and evaluation. Sprint 3: catalogue/RAG. Sprint 4: UI and existing quote-form handoff. Sprint 5: production hardening and staged release.
