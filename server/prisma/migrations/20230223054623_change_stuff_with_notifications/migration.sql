/*
  Warnings:

  - You are about to drop the column `studentID` on the `studentSupervisorNotification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "studentSupervisorNotification" DROP CONSTRAINT "studentSupervisorNotification_studentID_fkey";

-- AlterTable
ALTER TABLE "studentSupervisorNotification" DROP COLUMN "studentID";
