/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,
    "interest" TEXT NOT NULL,
    "studentSupervisor" INTEGER NOT NULL,
    "companySupervisorId" INTEGER NOT NULL,
    "universityAdminId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "universityId" INTEGER NOT NULL,
    "submissionsId" INTEGER NOT NULL,
    "weeklyStatusId" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentSupervisor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "universityAdmin" INTEGER NOT NULL,
    "weeklyStatusId" INTEGER NOT NULL,

    CONSTRAINT "StudentSupervisor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanySupervisor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "CompanySupervisor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UniversityAdmin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "universityId" INTEGER NOT NULL,

    CONSTRAINT "UniversityAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "submissionsId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submissions" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "timeOfSubmission" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeeklyStatus" (
    "id" SERIAL NOT NULL,
    "filePath" TEXT NOT NULL,
    "grande" INTEGER NOT NULL,

    CONSTRAINT "WeeklyStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_submissionsId_key" ON "Student"("submissionsId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_weeklyStatusId_key" ON "Student"("weeklyStatusId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentSupervisor_weeklyStatusId_key" ON "StudentSupervisor"("weeklyStatusId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_submissionsId_key" ON "Company"("submissionsId");

-- CreateIndex
CREATE UNIQUE INDEX "University_name_key" ON "University"("name");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_studentSupervisor_fkey" FOREIGN KEY ("studentSupervisor") REFERENCES "StudentSupervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_companySupervisorId_fkey" FOREIGN KEY ("companySupervisorId") REFERENCES "CompanySupervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_universityAdminId_fkey" FOREIGN KEY ("universityAdminId") REFERENCES "UniversityAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_submissionsId_fkey" FOREIGN KEY ("submissionsId") REFERENCES "Submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_weeklyStatusId_fkey" FOREIGN KEY ("weeklyStatusId") REFERENCES "WeeklyStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSupervisor" ADD CONSTRAINT "StudentSupervisor_universityAdmin_fkey" FOREIGN KEY ("universityAdmin") REFERENCES "UniversityAdmin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentSupervisor" ADD CONSTRAINT "StudentSupervisor_weeklyStatusId_fkey" FOREIGN KEY ("weeklyStatusId") REFERENCES "WeeklyStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanySupervisor" ADD CONSTRAINT "CompanySupervisor_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UniversityAdmin" ADD CONSTRAINT "UniversityAdmin_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_submissionsId_fkey" FOREIGN KEY ("submissionsId") REFERENCES "Submissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
