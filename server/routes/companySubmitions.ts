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
//get student id
//get company id
// update the submitions useing the ids
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

      await prisma.submissions.updateMany({
        where: {
          studentID: studentID,
          companyID: companySupervisorInfo?.companyId,
        },
        data: { status: "تم ااقبول" },
      });

      console.log("student accepted");
      res.send("ok");
    } catch (error) {
      res.sendStatus(500);
      console.log(`Error in accept-student: ${error}`);
    }
  }
);

export default router;
