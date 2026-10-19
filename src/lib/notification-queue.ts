export const DEFAULT_MAX_ATTEMPTS = 8;
export const MAX_BATCH_SIZE = 10;
export const NOTIFICATION_LEASE_MS = 60_000;
export const RETENTION_DAYS = 90;

const retryBaseMs = 30_000;
const retryMaxMs = 6 * 60 * 60 * 1000;

export type NotificationPayload = {
  name: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  rooms: string | null;
  area: string | null;
  product: string | null;
  timeline: string | null;
  details: string | null;
};

export type ClaimedNotification = {
  id: string;
  attemptCount: number;
  maxAttempts: number;
  leaseToken: string;
};

export type DeliveryResult =
  | { ok: true; providerMessageId: string | null }
  | { ok: false; retryable: boolean; errorCode: string };

export type NotificationRepository = {
  claimDueJobs(now: Date, leaseExpiresAt: Date, leaseToken: string, limit: number): Promise<ClaimedNotification[]>;
  loadPayload(job: ClaimedNotification): Promise<NotificationPayload | null>;
  markDelivered(job: ClaimedNotification, providerMessageId: string | null, deliveredAt: Date): Promise<boolean>;
  markFailed(
    job: ClaimedNotification,
    failure: { retryable: boolean; errorCode: string; failedAt: Date; nextAttemptAt: Date | null }
  ): Promise<boolean>;
  replayFailed(jobId: string, now: Date): Promise<boolean>;
  deleteExpiredEnquiries(cutoff: Date, limit: number): Promise<number>;
};

export type QueueOptions = {
  now?: Date;
  random?: () => number;
  leaseToken: string;
  limit?: number;
};

export function retryDelayMs(attemptNumber: number, random = Math.random): number {
  const exponential = Math.min(retryBaseMs * 2 ** Math.max(0, attemptNumber - 1), retryMaxMs);
  const jitter = Math.max(0, Math.min(1, random()));
  return Math.min(retryMaxMs, Math.round(exponential * (0.5 + jitter)));
}

export function classifyResendFailure(status: number): { retryable: boolean; errorCode: string } {
  return {
    retryable: status === 408 || status === 429 || status >= 500,
    errorCode: `RESEND_HTTP_${status}`
  };
}

export async function processNotificationBatch(
  repository: NotificationRepository,
  deliver: (payload: NotificationPayload) => Promise<DeliveryResult>,
  options: QueueOptions
): Promise<{ claimed: number; delivered: number; retried: number; dead: number; stale: number }> {
  const now = options.now ?? new Date();
  const limit = Math.max(1, Math.min(MAX_BATCH_SIZE, Math.floor(options.limit ?? 1)));
  const jobs = await repository.claimDueJobs(
    now,
    new Date(now.getTime() + NOTIFICATION_LEASE_MS),
    options.leaseToken,
    limit
  );
  const result = { claimed: jobs.length, delivered: 0, retried: 0, dead: 0, stale: 0 };

  for (const job of jobs) {
    let failure: { retryable: boolean; errorCode: string };
    if (job.attemptCount > job.maxAttempts) {
      failure = { retryable: true, errorCode: 'LEASE_EXPIRED' };
    } else {
      const payload = await repository.loadPayload(job);
      if (!payload) {
        failure = { retryable: false, errorCode: 'ENQUIRY_UNAVAILABLE' };
      } else {
        const delivery = await deliver(payload);
        if (delivery.ok) {
          const accepted = await repository.markDelivered(job, delivery.providerMessageId, now);
          if (accepted) result.delivered += 1;
          else result.stale += 1;
          continue;
        }
        failure = delivery;
      }
    }

    const canRetry = failure.retryable && job.attemptCount < job.maxAttempts;
    const nextAttemptAt = canRetry
      ? new Date(now.getTime() + retryDelayMs(job.attemptCount, options.random))
      : null;
    const recorded = await repository.markFailed(job, {
      ...failure,
      failedAt: now,
      nextAttemptAt
    });
    if (!recorded) result.stale += 1;
    else if (nextAttemptAt) result.retried += 1;
    else result.dead += 1;
  }

  return result;
}

export async function replayFailedNotification(
  repository: NotificationRepository,
  jobId: string,
  now = new Date()
): Promise<boolean> {
  return repository.replayFailed(jobId, now);
}

export async function purgeExpiredEnquiries(
  repository: NotificationRepository,
  now = new Date(),
  limit = 100
): Promise<number> {
  const safeLimit = Math.max(1, Math.min(500, Math.floor(limit)));
  const cutoff = new Date(now.getTime() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
  return repository.deleteExpiredEnquiries(cutoff, safeLimit);
}
