/*
  Warnings:

  - Added the required column `password` to the `CompanySupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `StudentSupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `UniversityAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanySupervisor" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentSupervisor" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UniversityAdmin" ADD COLUMN     "password" TEXT NOT NULL;
