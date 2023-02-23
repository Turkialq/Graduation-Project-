/*
  Warnings:

  - You are about to drop the column `filePath` on the `WeeklyTasks` table. All the data in the column will be lost.
  - You are about to drop the column `grande` on the `WeeklyTasks` table. All the data in the column will be lost.
  - Added the required column `assignmentPath` to the `WeeklyTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deadline` to the `WeeklyTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `WeeklyTasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `WeeklyTasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeeklyTasks" DROP COLUMN "filePath",
DROP COLUMN "grande",
ADD COLUMN     "assignmentPath" TEXT NOT NULL,
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
