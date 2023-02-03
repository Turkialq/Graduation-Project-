import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuth";

const prisma = new PrismaClient();
const router: Router = express.Router();
// get the list of student who applied for the company
router.get(
  "/get-student-list-submitions",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;

    try {
      let result = [{}];

      const supervisor = await prisma.companySupervisor.findFirst({
        where: {
          name: firstName,
          lastName: lastName,
        },
      });

      const companies = await prisma.company.findUnique({
        where: {
          id: supervisor?.companyId,
        },
        select: {
          sumbmitions: true,
          id: true,
        },
      });

      for (let i = 0; i < companies?.sumbmitions.length!; i++) {
        const student = await prisma.student.findUnique({
          where: {
            id: companies?.sumbmitions[i].studentID,
          },
        });

        const univeristy = await prisma.university.findUnique({
          where: {
            id: student?.universityId,
          },
        });

        const name = student?.firstName + " " + student?.lastName;

        result.push({
          id: student?.id,
          "البريد الاكتروني": student?.email,
          الاهتمام: student?.interest,
          الجامعة: univeristy?.name,
          التخصص: student?.major,
          "لمعدل التراكمي": student?.gpa,
          "اسم المتقدم": name,
        });
      }

      res.send(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

// get student who are accpeted
router.get(
  "/get-accpeted-student",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { name, lastName } = req.body.user;

    let result = [{}];

    try {
      const companySupervisorInfo = await prisma.companySupervisor.findFirst({
        where: {
          name: name,
          lastName: lastName,
        },
      });

      const company = await prisma.company.findUnique({
        where: {
          id: companySupervisorInfo?.companyId,
        },
      });

      const accpetedSubmitions = await prisma.submissions.findMany({
        where: {
          companyID: company?.id,
          status: "تم ااقبول",
        },
      });

      for (let i = 0; i < accpetedSubmitions.length; i++) {
        const student = await prisma.student.findUnique({
          where: {
            id: accpetedSubmitions[i].studentID,
          },
        });

        const univeristy = await prisma.university.findUnique({
          where: {
            id: student?.universityId,
          },
        });

        result.push({
          id: student?.id,
          "البريد الاكتروني": student?.email,
          الجامعة: univeristy?.name,
          التخصص: student?.major,
          "لمعدل التراكمي": student?.gpa,
          "اسم الطالب": student?.firstName + " " + student?.lastName,
        });
      }

      console.log(result);
      res.json(result);
    } catch (error) {
      res.sendStatus(500);
      console.log(`Error happened in accpeted students : ${error}`);
    }
  }
);
// get {student} id and the {company} id and update the submitions table
// then create notification for both the student and the company supervisor
router.post(
  "/accept-student",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { studentID } = req.body;
    const { name, lastName } = req.body.user;

    try {
      const companySupervisorInfo = await prisma.companySupervisor.findFirst({
        where: {
          name: name,
          lastName: lastName,
        },
      });

      const student = await prisma.student.findUnique({
        where: {
          id: studentID,
        },
      });

      const company = await prisma.company.findUnique({
        where: {
          id: companySupervisorInfo?.companyId,
        },
      });

      await prisma.submissions.updateMany({
        where: {
          studentID: studentID,
          companyID: companySupervisorInfo?.companyId,
        },
        data: { status: "تم ااقبول" },
      });

      await prisma.studentNotification.create({
        data: {
          studentID: student?.id as any,
          title: `تم القبول على بيئة العمل`,
          subTitle: `تم قبولك في ${company?.name}`,
        },
      });

      await prisma.companySupervisorNotification.create({
        data: {
          companySupervisorId: companySupervisorInfo?.id as any,
          studentID: studentID,
          title: `تم القبول على بيئة العمل` as any,
          subTitle: `تم قبول الطالب ${student?.firstName}` as any,
        },
      });

      console.log("student accepted");
      res.send("ok");
    } catch (error) {
      res.sendStatus(500);
      console.log(`Error in accept-student: ${error}`);
    }
  }
);

router.delete(
  "/delete-student",
  authenticateToken,
  async (req: Request, res: Response) => {}
);

export default router;
