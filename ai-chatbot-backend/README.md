# V CARE AI Sales Agent Backend

Standalone Python FastAPI service **inside this repository**. This folder is intentionally independent from the existing Next.js application. No existing website routes, Prisma schema, scripts, or production configuration are changed.

## Quick start (local)

```bash
cd ai-chatbot-backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -e '.[dev]'
cp .env.example .env
uvicorn app.main:app --reload --port 8000
pytest
```

Set `OPENROUTER_API_KEY` in `.env` for live responses. Without it, the chat endpoint returns a controlled 503; health remains available.

## API
- `GET /health` — process health
- `POST /api/v1/chat/messages` — stateless initial sales-agent response; request `{ "message": "..." }`

The initial endpoint intentionally does **not** claim persistent memory, lead capture, product lookup, or quote submission. Those are later milestones. Do not expose this service publicly before session security, rate limits, monitoring and production review.

## Architecture
`app/api` routes; `app/core` configuration; `app/llm` OpenRouter adapter; `app/agent` prompt/response orchestration; `tests` deterministic mocked tests. Refer to `../docs/ai-chatbot/` for the approved design proposals.

## Deployment
`docker-compose.yml` binds only to `127.0.0.1:18720` as a **candidate port**; verify it is free before use. Never run it against the production VPS without preflight and approval. It does not touch existing website containers or networks.
