import { randomUUID } from 'node:crypto';
import { Prisma } from '@/generated/prisma/client';
import { getPrisma } from '@/lib/prisma';
import { deliverNotificationEmail } from '@/lib/notification-delivery';
import {
  DEFAULT_MAX_ATTEMPTS,
  processNotificationBatch,
  purgeExpiredEnquiries,
  type ClaimedNotification,
  type NotificationPayload,
  type NotificationRepository
} from '@/lib/notification-queue';

const provider = 'resend';
const workerBatchSize = 1;
const retentionBatchSize = 100;

type ClaimedRow = {
  id: string;
  attemptCount: number;
  maxAttempts: number;
  leaseToken: string;
};

function createNotificationRepository(): NotificationRepository {
  const prisma = getPrisma();
  return {
    async claimDueJobs(now, leaseExpiresAt, leaseToken, limit) {
      return prisma.$transaction(async (transaction) => {
        const rows = await transaction.$queryRaw<ClaimedRow[]>(Prisma.sql`
          WITH candidates AS (
            SELECT "id"
            FROM "NotificationJob"
            WHERE (
              "status" = 'PENDING'
              AND "availableAt" <= ${now}
              AND "attemptCount" < "maxAttempts"
            ) OR (
              "status" = 'PROCESSING'
              AND "leaseExpiresAt" <= ${now}
            )
            ORDER BY "availableAt", "createdAt"
            LIMIT ${limit}
            FOR UPDATE SKIP LOCKED
          )
          UPDATE "NotificationJob" AS job
          SET
            "status" = 'PROCESSING',
            "attemptCount" = job."attemptCount" + 1,
            "leaseExpiresAt" = ${leaseExpiresAt},
            "leaseToken" = ${leaseToken},
            "updatedAt" = ${now}
          FROM candidates
          WHERE job."id" = candidates."id"
          RETURNING job."id", job."attemptCount", job."maxAttempts", job."leaseToken"
        `);
        return rows;
      });
    },

    async loadPayload(job: ClaimedNotification): Promise<NotificationPayload | null> {
      const notification = await prisma.notificationJob.findFirst({
        where: { id: job.id, status: 'PROCESSING', leaseToken: job.leaseToken },
        select: {
          enquiry: {
            select: {
              name: true,
              email: true,
              phone: true,
              projectType: true,
              rooms: true,
              area: true,
              product: true,
              timeline: true,
              details: true
            }
          }
        }
      });
      const enquiry = notification?.enquiry;
      if (!enquiry) return null;
      return {
        ...enquiry,
        area: enquiry.area?.toString() ?? null
      };
    },

    async markDelivered(job, providerMessageId, deliveredAt) {
      return prisma.$transaction(async (transaction) => {
        const updated = await transaction.notificationJob.updateMany({
          where: { id: job.id, status: 'PROCESSING', leaseToken: job.leaseToken },
          data: {
            status: 'SENT',
            deliveredAt,
            leaseExpiresAt: null,
            leaseToken: null,
            lastFailureRetryable: false,
            lastErrorCode: null
          }
        });
        if (updated.count !== 1) return false;

        const current = await transaction.notificationJob.findUnique({
          where: { id: job.id },
          select: { enquiryId: true, provider: true }
        });
        await transaction.notificationAttempt.create({
          data: {
            notificationJobId: job.id,
            enquiryId: current?.enquiryId ?? null,
            provider: current?.provider ?? provider,
            status: 'ACCEPTED',
            providerMessageId
          }
        });
        return true;
      });
    },

    async markFailed(job, failure) {
      return prisma.$transaction(async (transaction) => {
        const updated = await transaction.notificationJob.updateMany({
          where: { id: job.id, status: 'PROCESSING', leaseToken: job.leaseToken },
          data: {
            status: failure.nextAttemptAt ? 'PENDING' : 'DEAD',
            availableAt: failure.nextAttemptAt ?? failure.failedAt,
            leaseExpiresAt: null,
            leaseToken: null,
            lastFailureRetryable: failure.retryable,
            lastErrorCode: failure.errorCode
          }
        });
        if (updated.count !== 1) return false;

        const current = await transaction.notificationJob.findUnique({
          where: { id: job.id },
          select: { enquiryId: true, provider: true }
        });
        await transaction.notificationAttempt.create({
          data: {
            notificationJobId: job.id,
            enquiryId: current?.enquiryId ?? null,
            provider: current?.provider ?? provider,
            status: 'FAILED',
            errorCode: failure.errorCode
          }
        });
        return true;
      });
    },

    async replayFailed(jobId, now) {
      const updated = await prisma.notificationJob.updateMany({
        where: {
          id: jobId,
          status: 'DEAD',
          lastFailureRetryable: true,
          enquiryId: { not: null }
        },
        data: {
          status: 'PENDING',
          attemptCount: 0,
          availableAt: now,
          leaseExpiresAt: null,
          leaseToken: null,
          lastFailureRetryable: false,
          lastErrorCode: null
        }
      });
      return updated.count === 1;
    },

    async deleteExpiredEnquiries(cutoff, limit) {
      const deleted = await prisma.$queryRaw<Array<{ id: string }>>(Prisma.sql`
        WITH expired AS (
          SELECT enquiry."id"
          FROM "Enquiry" AS enquiry
          LEFT JOIN "NotificationJob" AS job ON job."enquiryId" = enquiry."id"
          WHERE enquiry."createdAt" < ${cutoff}
            AND (job."id" IS NULL OR job."status" IN ('SENT', 'DEAD'))
          ORDER BY enquiry."createdAt"
          LIMIT ${limit}
          FOR UPDATE OF enquiry SKIP LOCKED
        )
        DELETE FROM "Enquiry" AS enquiry
        USING expired
        WHERE enquiry."id" = expired."id"
        RETURNING enquiry."id"
      `);
      return deleted.length;
    }
  };
};

export async function runNotificationWorker() {
  const { RESEND_API_KEY, RESEND_FROM_EMAIL, QUOTE_TO_EMAIL } = process.env;
  if (!RESEND_API_KEY || !RESEND_FROM_EMAIL || !QUOTE_TO_EMAIL) {
    throw new Error('Notification email configuration is incomplete.');
  }

  const repository = createNotificationRepository();
  const queue = await processNotificationBatch(
    repository,
    (enquiry) => deliverNotificationEmail(enquiry, {
      apiKey: RESEND_API_KEY,
      from: RESEND_FROM_EMAIL,
      to: QUOTE_TO_EMAIL
    }),
    { leaseToken: randomUUID(), limit: workerBatchSize }
  );

  const purged = await purgeExpiredEnquiries(repository, new Date(), retentionBatchSize);
  return { ...queue, purged };
}

export async function replayNotificationJob(jobId: string): Promise<boolean> {
  return createNotificationRepository().replayFailed(jobId, new Date());
}

export const notificationWorkerLimits = {
  maxAttempts: DEFAULT_MAX_ATTEMPTS,
  batchSize: workerBatchSize,
  retentionBatchSize
};
