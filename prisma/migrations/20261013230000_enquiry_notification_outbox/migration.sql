-- Add idempotency and a durable notification outbox without rewriting prior history.
CREATE TYPE "NotificationJobStatus" AS ENUM ('PENDING', 'PROCESSING', 'SENT', 'DEAD');

ALTER TABLE "Enquiry"
ADD COLUMN "submissionKey" VARCHAR(64);

CREATE UNIQUE INDEX "Enquiry_submissionKey_key" ON "Enquiry"("submissionKey");

CREATE TABLE "NotificationJob" (
    "id" TEXT NOT NULL,
    "enquiryId" TEXT,
    "provider" VARCHAR(50) NOT NULL,
    "status" "NotificationJobStatus" NOT NULL DEFAULT 'PENDING',
    "attemptCount" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 8,
    "availableAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "leaseExpiresAt" TIMESTAMP(3),
    "leaseToken" VARCHAR(36),
    "lastFailureRetryable" BOOLEAN NOT NULL DEFAULT false,
    "lastErrorCode" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deliveredAt" TIMESTAMP(3),

    CONSTRAINT "NotificationJob_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "NotificationJob_attemptCount_check" CHECK ("attemptCount" >= 0),
    CONSTRAINT "NotificationJob_maxAttempts_check" CHECK ("maxAttempts" > 0)
);

CREATE UNIQUE INDEX "NotificationJob_enquiryId_key" ON "NotificationJob"("enquiryId");
CREATE INDEX "NotificationJob_status_availableAt_idx" ON "NotificationJob"("status", "availableAt");
CREATE INDEX "NotificationJob_status_leaseExpiresAt_idx" ON "NotificationJob"("status", "leaseExpiresAt");

ALTER TABLE "NotificationAttempt"
ADD COLUMN "notificationJobId" TEXT;

CREATE INDEX "NotificationAttempt_notificationJobId_createdAt_idx"
ON "NotificationAttempt"("notificationJobId", "createdAt");

ALTER TABLE "NotificationJob"
ADD CONSTRAINT "NotificationJob_enquiryId_fkey"
FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "NotificationAttempt"
ADD CONSTRAINT "NotificationAttempt_notificationJobId_fkey"
FOREIGN KEY ("notificationJobId") REFERENCES "NotificationJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;
