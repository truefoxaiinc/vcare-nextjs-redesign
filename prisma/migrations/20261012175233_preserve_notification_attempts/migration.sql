-- DropForeignKey
ALTER TABLE "NotificationAttempt" DROP CONSTRAINT "NotificationAttempt_enquiryId_fkey";

-- AlterTable
ALTER TABLE "NotificationAttempt" ALTER COLUMN "enquiryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "NotificationAttempt" ADD CONSTRAINT "NotificationAttempt_enquiryId_fkey" FOREIGN KEY ("enquiryId") REFERENCES "Enquiry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
