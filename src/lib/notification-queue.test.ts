import { describe, expect, it, vi } from 'vitest';
import {
  classifyResendFailure,
  processNotificationBatch,
  purgeExpiredEnquiries,
  replayFailedNotification,
  retryDelayMs,
  type ClaimedNotification,
  type NotificationRepository
} from '@/lib/notification-queue';

const job: ClaimedNotification = {
  id: 'job-1',
  attemptCount: 1,
  maxAttempts: 2,
  leaseToken: 'lease-token'
};

function repository(overrides: Partial<NotificationRepository> = {}): NotificationRepository {
  return {
    claimDueJobs: vi.fn().mockResolvedValue([job]),
    loadPayload: vi.fn().mockResolvedValue({
      name: 'Alex Chen',
      email: 'alex@example.com',
      phone: null,
      projectType: null,
      rooms: null,
      area: null,
      product: null,
      timeline: null,
      details: null
    }),
    markDelivered: vi.fn().mockResolvedValue(true),
    markFailed: vi.fn().mockResolvedValue(true),
    replayFailed: vi.fn().mockResolvedValue(true),
    deleteExpiredEnquiries: vi.fn().mockResolvedValue(0),
    ...overrides
  };
}

describe('notification queue policy', () => {
  it('uses bounded jittered exponential backoff and classifies provider responses', () => {
    expect(retryDelayMs(1, () => 0)).toBe(15_000);
    expect(retryDelayMs(2, () => 1)).toBe(90_000);
    expect(retryDelayMs(50, () => 1)).toBeLessThanOrEqual(6 * 60 * 60 * 1000);
    expect(classifyResendFailure(429).retryable).toBe(true);
    expect(classifyResendFailure(503).retryable).toBe(true);
    expect(classifyResendFailure(401).retryable).toBe(false);
  });

  it('records successful provider acceptance', async () => {
    const store = repository();
    const deliver = vi.fn().mockResolvedValue({ ok: true, providerMessageId: 'resend-id' });

    const result = await processNotificationBatch(store, deliver, {
      leaseToken: 'batch-token',
      now: new Date('2026-10-13T00:00:00Z')
    });

    expect(result).toMatchObject({ claimed: 1, delivered: 1, retried: 0, dead: 0 });
    expect(store.markDelivered).toHaveBeenCalledWith(job, 'resend-id', new Date('2026-10-13T00:00:00Z'));
  });

  it('schedules retryable failures and marks permanent or exhausted failures dead', async () => {
    const retryStore = repository();
    const now = new Date('2026-10-13T00:00:00Z');
    const retryResult = await processNotificationBatch(
      retryStore,
      vi.fn().mockResolvedValue({ ok: false, retryable: true, errorCode: 'RESEND_TIMEOUT' }),
      { leaseToken: 'batch-token', now, random: () => 0 }
    );
    expect(retryResult.retried).toBe(1);
    expect(retryStore.markFailed).toHaveBeenCalledWith(job, expect.objectContaining({
      nextAttemptAt: new Date(now.getTime() + 15_000)
    }));

    const permanentStore = repository();
    const permanentResult = await processNotificationBatch(
      permanentStore,
      vi.fn().mockResolvedValue({ ok: false, retryable: false, errorCode: 'RESEND_HTTP_401' }),
      { leaseToken: 'batch-token', now }
    );
    expect(permanentResult.dead).toBe(1);

    const lastAttemptJob = { ...job, attemptCount: 2 };
    const lastAttemptStore = repository({
      claimDueJobs: vi.fn().mockResolvedValue([lastAttemptJob])
    });
    const lastAttemptResult = await processNotificationBatch(
      lastAttemptStore,
      vi.fn().mockResolvedValue({ ok: false, retryable: true, errorCode: 'RESEND_TIMEOUT' }),
      { leaseToken: 'batch-token', now }
    );
    expect(lastAttemptResult.dead).toBe(1);
  });

  it('does not resend after an expired lease exceeds the attempt limit', async () => {
    const store = repository({
      claimDueJobs: vi.fn().mockResolvedValue([{ ...job, attemptCount: 3 }])
    });
    const deliver = vi.fn();

    const result = await processNotificationBatch(store, deliver, { leaseToken: 'new-lease' });

    expect(deliver).not.toHaveBeenCalled();
    expect(store.markFailed).toHaveBeenCalledWith(
      expect.objectContaining({ attemptCount: 3 }),
      expect.objectContaining({ errorCode: 'LEASE_EXPIRED', nextAttemptAt: null })
    );
    expect(result.dead).toBe(1);
  });

  it('leaves stale lease results unapplied and caps cleanup batches at 500', async () => {
    const staleStore = repository({ markDelivered: vi.fn().mockResolvedValue(false) });
    const staleResult = await processNotificationBatch(
      staleStore,
      vi.fn().mockResolvedValue({ ok: true, providerMessageId: null }),
      { leaseToken: 'batch-token' }
    );
    expect(staleResult.stale).toBe(1);

    const retentionStore = repository({ deleteExpiredEnquiries: vi.fn().mockResolvedValue(2) });
    const now = new Date('2026-10-13T00:00:00Z');
    expect(await purgeExpiredEnquiries(retentionStore, now, 900)).toBe(2);
    expect(retentionStore.deleteExpiredEnquiries).toHaveBeenCalledWith(
      new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000),
      500
    );
    expect(await replayFailedNotification(retentionStore, 'job-1', now)).toBe(true);
  });

  it('allows concurrent batch invocations to rely on atomic repository claims', async () => {
    let claimed = false;
    const store = repository({
      claimDueJobs: vi.fn(async () => {
        if (claimed) return [];
        claimed = true;
        return [job];
      })
    });
    const deliver = vi.fn().mockResolvedValue({ ok: true, providerMessageId: null });

    const results = await Promise.all([
      processNotificationBatch(store, deliver, { leaseToken: 'lease-a' }),
      processNotificationBatch(store, deliver, { leaseToken: 'lease-b' })
    ]);

    expect(results.reduce((total, item) => total + item.claimed, 0)).toBe(1);
    expect(deliver).toHaveBeenCalledTimes(1);
  });
});
