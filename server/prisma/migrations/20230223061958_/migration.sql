/*
  Warnings:

  - Added the required column `StudentTempId` to the `WeeklyTasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeeklyTasks" ADD COLUMN     "StudentTempId" INTEGER NOT NULL;
