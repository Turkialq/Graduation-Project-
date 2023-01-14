/*
  Warnings:

  - You are about to drop the column `submissionsId` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `submissionsId` on the `Student` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentID]` on the table `Submissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[companyID]` on the table `Submissions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyID` to the `Submissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentID` to the `Submissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_submissionsId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_submissionsId_fkey";

-- DropIndex
DROP INDEX "Company_submissionsId_key";

-- DropIndex
DROP INDEX "Student_submissionsId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "submissionsId";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "submissionsId";

-- AlterTable
ALTER TABLE "Submissions" ADD COLUMN     "companyID" INTEGER NOT NULL,
ADD COLUMN     "studentID" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_studentID_key" ON "Submissions"("studentID");

-- CreateIndex
CREATE UNIQUE INDEX "Submissions_companyID_key" ON "Submissions"("companyID");

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
