/*
  Warnings:

  - You are about to drop the column `submissionsId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[submissionsId]` on the table `CompanySupervisor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `submissionsId` to the `CompanySupervisor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_submissionsId_fkey";

-- DropIndex
DROP INDEX "Company_submissionsId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "submissionsId";

-- AlterTable
ALTER TABLE "CompanySupervisor" ADD COLUMN     "submissionsId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CompanySupervisor_submissionsId_key" ON "CompanySupervisor"("submissionsId");

-- AddForeignKey
ALTER TABLE "CompanySupervisor" ADD CONSTRAINT "CompanySupervisor_submissionsId_fkey" FOREIGN KEY ("submissionsId") REFERENCES "Submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
