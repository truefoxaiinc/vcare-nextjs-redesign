# VPS Staging Deployment and Rollback Plan

Status: Planning only; no deployment executed.

## Isolation requirements
Use separate repository, Compose project, network, credentials and database/schema under a dedicated project directory. Do not alter existing Apache vhosts, nftables rules, shared Docker networks or running services during Sprint 0.

## Preflight
Inventory current ports, Compose stacks, CPU/memory/disk, firewall forwarding, DNS, SSL and backup status. Candidate backend bind: `127.0.0.1:18720:8000` **only after checking availability**. OpenRouter key is a server-side secret; use environment/secret store outside Git.

## Staging rollout
Build pinned images; run static checks and tests; provision isolated staging DB; take backups; run reviewed Alembic migrations; start isolated services; verify `/health`, `/ready`, chat session auth, OpenRouter connectivity, timeout behavior, logs and resource limits. Do not connect public website until approved.

## Release gate
PR review, security and RAG evaluations, verified catalogue rights, cost budget, monitoring, backup/restore test, rollback rehearsal and explicit production approval.

## Rollback
Keep prior image tag and database backup. Stop only the Vcare chatbot Compose project, restore prior image/config, and revert compatible migrations or restore staging backup as needed. Never use global `docker compose down`, broad network pruning or shared firewall resets.
