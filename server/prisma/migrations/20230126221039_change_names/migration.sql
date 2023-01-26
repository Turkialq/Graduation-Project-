/*
  Warnings:

  - You are about to drop the `WeeklyStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `studentID` to the `studentSupervisorNotification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_weeklyStatusId_fkey";

-- DropForeignKey
ALTER TABLE "StudentSupervisor" DROP CONSTRAINT "StudentSupervisor_weeklyStatusId_fkey";

-- AlterTable
ALTER TABLE "studentSupervisorNotification" ADD COLUMN     "studentID" INTEGER NOT NULL;

-- DropTable
DROP TABLE "WeeklyStatus";

-- CreateTable
CREATE TABLE "WeeklyTasks" (
    "id" SERIAL NOT NULL,
    "filePath" TEXT NOT NULL,
    "grande" INTEGER NOT NULL,

    CONSTRAINT "WeeklyTasks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_weeklyStatusId_fkey" FOREIGN KEY ("weeklyStatusId") REFERENCES "WeeklyTasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSupervisor" ADD CONSTRAINT "StudentSupervisor_weeklyStatusId_fkey" FOREIGN KEY ("weeklyStatusId") REFERENCES "WeeklyTasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSupervisorNotification" ADD CONSTRAINT "studentSupervisorNotification_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
