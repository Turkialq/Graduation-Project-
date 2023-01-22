-- CreateTable
CREATE TABLE "studentNotification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "studentID" INTEGER NOT NULL,

    CONSTRAINT "studentNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "studentSupervisorNotification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "studentSupervisorId" INTEGER NOT NULL,

    CONSTRAINT "studentSupervisorNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "companySupervisorNotification" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "companySupervisorId" INTEGER NOT NULL,

    CONSTRAINT "companySupervisorNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studentNotification" ADD CONSTRAINT "studentNotification_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "studentSupervisorNotification" ADD CONSTRAINT "studentSupervisorNotification_studentSupervisorId_fkey" FOREIGN KEY ("studentSupervisorId") REFERENCES "StudentSupervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "companySupervisorNotification" ADD CONSTRAINT "companySupervisorNotification_companySupervisorId_fkey" FOREIGN KEY ("companySupervisorId") REFERENCES "CompanySupervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
