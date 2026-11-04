#!/usr/bin/env node
/**
 * Run once per invocation from an operator-managed scheduler.
 * Required: VCARE_WORKER_URL, NOTIFICATION_WORKER_SECRET.
 * Never print the URL, bearer token, response body or enquiry data.
 */
const urlText = process.env.VCARE_WORKER_URL;
const secret = process.env.NOTIFICATION_WORKER_SECRET;
if (!urlText || !secret || secret.length < 24) {
  console.error('worker_poll configuration_missing');
  process.exitCode = 2;
} else {
  let target;
  try {
    target = new URL(urlText);
    if (target.protocol !== 'https:' ||
        target.username || target.password || target.search || target.hash ||
        target.pathname !== '/api/internal/notification-worker') {
      throw new Error('Invalid worker URL');
    }
  } catch {
    console.error('worker_poll invalid_url');
    process.exitCode = 2;
  }

  if (target) {
    try {
      const response = await fetch(target, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secret}`,
          'Content-Type': 'application/json'
        },
        redirect: 'error',
        cache: 'no-store',
        signal: AbortSignal.timeout(20_000)
      });
      if (!response.ok) {
        console.error(`worker_poll http_failure status=${response.status}`);
        process.exitCode = 1;
      } else {
        const result = await response.json();
        if (result?.ok !== true ||
            !['claimed','delivered','retried','dead','stale','purged'].every(
              key => Number.isSafeInteger(result[key]) && result[key] >= 0
            )) {
          console.error('worker_poll invalid_response');
          process.exitCode = 1;
        } else {
          const { claimed, delivered, retried, dead, stale, purged } = result;
          console.log(`worker_poll ok claimed=${claimed} delivered=${delivered} retried=${retried} dead=${dead} stale=${stale} purged=${purged}`);
          if (dead > 0 || stale > 0) process.exitCode = 1;
        }
      }
    } catch (error) {
      const code = error instanceof Error && error.name === 'TimeoutError'
        ? 'timeout' : 'request_failed';
      console.error(`worker_poll ${code}`);
      process.exitCode = 1;
    }
  }
}
