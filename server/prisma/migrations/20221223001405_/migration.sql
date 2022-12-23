-- DropForeignKey
ALTER TABLE "CompanySupervisor" DROP CONSTRAINT "CompanySupervisor_submissionsId_fkey";

-- AlterTable
ALTER TABLE "CompanySupervisor" ALTER COLUMN "submissionsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CompanySupervisor" ADD CONSTRAINT "CompanySupervisor_submissionsId_fkey" FOREIGN KEY ("submissionsId") REFERENCES "Submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
