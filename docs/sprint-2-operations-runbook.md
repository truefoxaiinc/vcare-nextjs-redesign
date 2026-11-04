# Sprint 2 — enquiry and notification operations

Status: **repository-level implementation only**. No staging database, scheduler, hosted monitoring or production deployment has been configured. Tracks issues #4, #5, #6 and #17.

## Architecture and boundaries

The public catalogue is static. Quote/contact requests use `POST /api/enquiries` → Prisma/PostgreSQL `Enquiry` and `NotificationJob` → authenticated `POST /api/internal/notification-worker` → Resend. Worker execution is separate from request acceptance. The worker handles **one notification per invocation**, retries eligible failures with a lease, and performs bounded conditional 90-day retention cleanup. Provider acceptance is **not proof of inbox delivery**; timeout/retry can result in duplicate email.

The repository's `docker-compose.yml` is for local development only. Do not run it against an existing shared production database or reuse its development password.

## Staging verification (issue #4)

1. Provision an **isolated, disposable PostgreSQL** database with unique staging credentials. Confirm `DATABASE_URL` targets staging before running any command. Never use production credentials in a preview deployment.
2. On a clean worktree run `npm ci`, `npm run db:generate`, `npm run db:validate`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`.
3. On staging only, run `npx prisma migrate deploy` and `npm run db:status`. Verify tables, indexes and relationships from `prisma/schema.prisma`.
4. Using test-only enquiries, verify successful submit, invalid/expired Turnstile, missing env, duplicate idempotency key, Resend 429/5xx, exhausted retry, manual replay, and retention of pending jobs.
5. Invoke two workers concurrently against staging; confirm `FOR UPDATE SKIP LOCKED` prevents simultaneous claims. Check lease-expiry behavior and the possibility of duplicate provider acceptance after a timeout.
6. Confirm deletion of eligible enquiries older than 90 days while keeping queued records; review whether notification metadata retention needs an explicit separate policy.
7. Record redacted evidence, timestamps and outcomes in issue #4. **Do not mark integration verified until run against real disposable PostgreSQL.**

## Scheduler (issue #5)

A standalone **single-shot** operator script is provided at `scripts/worker-poll.mjs`. It requires:

- `VCARE_WORKER_URL`: exact **HTTPS** URL ending in `/api/internal/notification-worker`, with no query string.
- `NOTIFICATION_WORKER_SECRET`: server-side secret (minimum 24 characters for this operator script).

Run with `node scripts/worker-poll.mjs` from a trusted scheduler environment. It makes **one** authenticated POST and exits. It never prints the secret, URL or response body. It logs aggregate counts only; exit 1 on failed request, invalid response, dead/stale jobs; exit 2 on configuration error.

**Do not put the secret directly in crontab command arguments, shell history, logs or frontend configuration.** Inject through the scheduler's secret store or a root-owned environment file with strict permissions. Configure the cadence only after measuring real queue latency and hosting execution limits. At one job per invocation, backlog throughput is constrained by scheduler frequency. Do not enable parallel schedules before concurrency tests. Restrict network access where hosting supports it.

## Monitoring (issue #17)

Aggregate scheduler output can feed host logging/alerting. Treat nonzero exit codes as alert signals; also alert on missed scheduled executions, persistent queue backlog, age of oldest pending job and failure rate. Avoid enquiry names, email addresses, tokens and request bodies in logs.

For **authorized staging/production DB operators only**, read-only diagnostic SQL:

```sql
SELECT "status", count(*) AS jobs,
       min("createdAt") AS oldest_created
FROM "NotificationJob"
GROUP BY "status"
ORDER BY "status";

SELECT count(*) AS overdue_pending
FROM "NotificationJob"
WHERE "status" = 'PENDING' AND "availableAt" < now() - interval '15 minutes';

SELECT count(*) AS dead_letters
FROM "NotificationJob"
WHERE "status" = 'DEAD';
```

These queries must be executed only with approved database access. Do not expose job IDs or PII in public monitoring. Document alert thresholds and on-call owner with the hosting team.

## Release, backup and rollback (issue #6)

1. Confirm the actual hosting platform, DNS, TLS, Node version and isolated secrets. Enforce least-privilege database and scheduler access.
2. Verify staging release, then test a **staging database backup and restore**. Record the backup location, encryption, retention and restore time.
3. Production migrations require explicit approval, a fresh backup and a reviewed `prisma migrate deploy` plan; do not run migrations during every application build.
4. Validate public pages, quote submission, worker authorization, mail provider acceptance, monitoring and `/admin` protection over HTTPS.
5. For rollback: disable scheduling first, preserve queued rows, revert application only to a schema-compatible version, and verify worker compatibility before resuming. Never delete pending jobs to force a clean rollback.
6. Record incident ownership, contacts, severity criteria and recovery steps. Test a worker outage in staging.

## Current gates

- [x] Source review of enquiry, worker, queue, Prisma schema and deployment notes.
- [x] Single-shot HTTPS scheduler client with safe aggregate output.
- [x] Unit checks for scheduler configuration validation.
- [ ] CI/local checks executed on the proposed commit.
- [ ] Disposable staging DB provisioned and integration tests performed.
- [ ] Hosted scheduler and alerting configured and verified.
- [ ] Production TLS, secret management, backup/restore and rollback verified.
- [ ] Business approval for deployment and any production database migration.

No issues should be closed until their respective gates are satisfied.
