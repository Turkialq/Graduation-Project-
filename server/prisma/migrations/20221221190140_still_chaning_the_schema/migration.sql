/*
  Warnings:

  - Added the required column `lastName` to the `CompanySupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `StudentSupervisor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanySupervisor" ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentSupervisor" ADD COLUMN     "lastName" TEXT NOT NULL;
