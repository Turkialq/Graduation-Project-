/*
  Warnings:

  - Added the required column `email` to the `CompanySupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `CompanySupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `CompanySupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `StudentSupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `StudentSupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `StudentSupervisor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `UniversityAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `UniversityAdmin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `major` to the `UniversityAdmin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanySupervisor" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentSupervisor" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UniversityAdmin" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "major" TEXT NOT NULL;
