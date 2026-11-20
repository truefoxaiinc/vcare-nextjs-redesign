# Vcare production hosting with Docker Compose

This deployment is deliberately isolated from the other applications on the VPS.

## Isolation and network boundaries

- Compose project name is fixed to `vcareflooring-web`; Compose-created containers, bridge network, and named volume are scoped to this project.
- The Next.js process (website plus its `/api/*` routes) is published only on host loopback: `127.0.0.1:18660` by default. It is not directly exposed to the public network.
- PostgreSQL has no published host port. Only Vcare containers on the private-to-this-stack Compose bridge can reach it.
- The chatbot API runs in its separate `vcare-ai-chatbot` Compose project. Its API has no published host port; the website reaches it through the explicitly shared `vcare-ai-chatbot_chatbot_egress` network at `http://vcare-chat-api:8000`.
- No `container_name`, host network, global Docker cleanup, or unrelated cross-project dependency is configured.
- Do not use `docker compose down -v`, `docker system prune`, or commands targeting other Compose projects during this deployment.

## Prepare the server

Run from the Vcare repository directory after the Docker deployment PR has been merged and pulled:

```bash
cd /home/vcareflooring/vcareweb
git status --short
git pull --ff-only
```

Before continuing, confirm the merged revision contains `Dockerfile`, `docker-compose.yml`, and `.env.docker.example`. Do not overwrite an existing `.env`.

Create the environment file only if it does not already exist:

```bash
test -f .env || install -m 600 .env.docker.example .env
chmod 600 .env
nano .env
```

Set a unique long random `POSTGRES_PASSWORD` and the matching `DATABASE_URL`. URL-encode reserved characters in the password inside the URL. Keep all secrets private; do not paste the contents of `.env` into chat or logs. Configure the required Turnstile and Resend values before enabling quote/email submission. The public Turnstile site key is supplied at image build time.

Configure the chatbot's separate environment file without overwriting an existing one:

```bash
test -f ai-chatbot-backend/.env || install -m 600 ai-chatbot-backend/.env.example ai-chatbot-backend/.env
chmod 600 ai-chatbot-backend/.env
nano ai-chatbot-backend/.env
```

Set a unique `CHATBOT_DB_PASSWORD` and a valid server-side `OPENROUTER_API_KEY`. Start the chatbot first so its private Docker network exists:

```bash
cd ai-chatbot-backend
docker compose up -d --build
docker compose exec api alembic upgrade head
cd ..
```

The chatbot API is reachable by the website as `http://vcare-chat-api:8000`; do not publish port 8000 on the host. The site exposes its proxy on the same-origin `/api/v1/chat/sessions` route.

Check that the intended ports are free:

```bash
ss -lntp | grep -E ':18660\\b' || true
```

If port 18660 is occupied, choose another unused high port in `APP_PORT` in this Vcare `.env` only. Do not stop the process using that port.

## Validate and start only this stack

Inspect the Compose project and services:

```bash
docker compose config --services
docker compose ps
```

Then build and start the Vcare services from this directory:

```bash
docker compose up -d --build
docker compose ps
docker compose logs --tail=100 migrate
docker compose logs --tail=100 web
```

The Compose project name is `vcareflooring-web`. These commands operate on this Compose project only. They do not stop, recreate, or remove containers belonging to the other projects.

Verify the local app endpoint:

```bash
curl -I http://127.0.0.1:18660/
```

Verify PostgreSQL is not published on a host port:

```bash
docker compose port db 5432
```

This should return no published port. The web container can still access PostgreSQL using the Compose service hostname `db:5432`.

## Apache reverse proxy

After the local health check succeeds, configure the intended HTTPS virtual host to proxy requests to `http://127.0.0.1:18660`. Preserve the existing Apache virtual hosts and SSL configuration; add or change only the Vcare site's vhost. Do not open port 18660 in the public firewall because Apache connects over loopback.

## Routine operations

Run these only from this repository directory:

```bash
docker compose ps
docker compose logs --tail=100 web
docker compose logs --tail=100 db
docker compose restart web
docker compose up -d --build web
```

Do not run `docker compose down` as a routine update. Do not run `docker compose down -v` under any circumstances unless an intentional Vcare database deletion has been separately approved and backed up. Never use global prune commands on this shared VPS.

## Database backup and migrations

The database persists in the Compose-managed volume `vcare-postgres-data` (scoped under the Compose project). Back up and verify restore before production migrations or upgrades. The `migrate` service runs Prisma `migrate deploy` after PostgreSQL reports healthy and before the web service starts. It does not create migrations.
