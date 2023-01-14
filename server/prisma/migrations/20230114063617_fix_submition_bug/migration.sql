/*
  Warnings:

  - You are about to drop the column `submissionsId` on the `CompanySupervisor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[submissionsId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CompanySupervisor" DROP CONSTRAINT "CompanySupervisor_submissionsId_fkey";

-- DropIndex
DROP INDEX "CompanySupervisor_submissionsId_key";

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "submissionsId" INTEGER;

-- AlterTable
ALTER TABLE "CompanySupervisor" DROP COLUMN "submissionsId";

-- CreateIndex
CREATE UNIQUE INDEX "Company_submissionsId_key" ON "Company"("submissionsId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_submissionsId_fkey" FOREIGN KEY ("submissionsId") REFERENCES "Submissions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
