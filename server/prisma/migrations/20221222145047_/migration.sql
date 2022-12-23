-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_submissionsId_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "submissionsId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_submissionsId_fkey" FOREIGN KEY ("submissionsId") REFERENCES "Submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
