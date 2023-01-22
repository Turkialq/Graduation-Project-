/*
  Warnings:

  - Added the required column `studentID` to the `companySupervisorNotification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companySupervisorNotification" ADD COLUMN     "studentID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "companySupervisorNotification" ADD CONSTRAINT "companySupervisorNotification_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
