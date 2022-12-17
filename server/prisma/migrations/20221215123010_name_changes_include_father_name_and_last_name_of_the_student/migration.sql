/*
  Warnings:

  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - Added the required column `fatherName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lasttName` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" DROP COLUMN "name",
ADD COLUMN     "fatherName" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lasttName" TEXT NOT NULL;
