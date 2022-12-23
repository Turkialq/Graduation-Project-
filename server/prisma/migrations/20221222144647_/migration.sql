-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_companySupervisorId_fkey";

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "companySupervisorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_companySupervisorId_fkey" FOREIGN KEY ("companySupervisorId") REFERENCES "CompanySupervisor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
