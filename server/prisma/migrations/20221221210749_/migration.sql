-- DropForeignKey
ALTER TABLE "StudentSupervisor" DROP CONSTRAINT "StudentSupervisor_weeklyStatusId_fkey";

-- AlterTable
ALTER TABLE "StudentSupervisor" ALTER COLUMN "weeklyStatusId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentSupervisor" ADD CONSTRAINT "StudentSupervisor_weeklyStatusId_fkey" FOREIGN KEY ("weeklyStatusId") REFERENCES "WeeklyStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
