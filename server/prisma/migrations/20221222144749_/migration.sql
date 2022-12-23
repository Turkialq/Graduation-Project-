-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_weeklyStatusId_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "companyId" DROP NOT NULL,
ALTER COLUMN "weeklyStatusId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_weeklyStatusId_fkey" FOREIGN KEY ("weeklyStatusId") REFERENCES "WeeklyStatus"("id") ON DELETE SET NULL ON UPDATE CASCADE;
