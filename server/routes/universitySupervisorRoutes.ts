import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuthRoutes";

const prisma = new PrismaClient();
const router: Router = express.Router();

router.get(
  "/get-university-supervisor-dashboard-information",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body.user;
    try {
      const uniSupervisor = await prisma.studentSupervisor.findFirst({
        where: {
          name: firstName,
          lastName: lastName,
        },
        select: {
          name: true,
          lastName: true,
          admin: true,
          major: true,
        },
      });

      const uni = await prisma.university.findUnique({
        where: {
          id: uniSupervisor?.admin.universityId,
        },
      });

      const result = {
        name: uniSupervisor?.name,
        lastName: uniSupervisor?.lastName,
        major: uniSupervisor?.major,
        uniName: uni?.name,
      };

      res.json(result);
    } catch (error) {
      res.sendStatus(500);
      console.log(`Error happened at uni dashboard info: ${error}`);
    }
  }
);
// get list of students who are connected to uniSuper
// 1 - get the uni object
// 2 - get the list of students are who related
// 3 - get their submition status
router.get(
  "/get-university-supervisor-students",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { name, lastName } = req.body.user;
    try {
      const result = [{}];

      const uniSupervisor = await prisma.studentSupervisor.findFirst({
        where: {
          name: name,
          lastName: lastName,
        },
      });

      const studentsOfSupervisor = await prisma.student.findMany({
        where: {
          studentSupervisor: uniSupervisor?.id,
        },
        select: {
          firstName: true,
          lastName: true,
          id: true,
          major: true,
          companyId: true,
        },
      });

      for (let i = 0; i < studentsOfSupervisor.length; i++) {
        if (studentsOfSupervisor[i].companyId != null) {
          const acceptedCompany = await prisma.company.findUnique({
            where: {
              id: studentsOfSupervisor[i].companyId!,
            },
          });

          const studentObject = {
            id: studentsOfSupervisor[i].id,
            "اسم الطالب": studentsOfSupervisor[i].firstName,
            التخصص: studentsOfSupervisor[i].major,
            "بيئة العمل": acceptedCompany?.name,
          };

          result.push(studentObject);
        }

        if (studentsOfSupervisor[i].companyId == null) {
          const studentObject = {
            id: studentsOfSupervisor[i].id,
            "اسم الطالب": studentsOfSupervisor[i].firstName,
            التخصص: studentsOfSupervisor[i].major,
            "بيئة العمل": "لم يتم القبول",
          };

          result.push(studentObject);
        }
      }

      res.json(result);
    } catch (error) {
      res.sendStatus(500);
      console.log(`Error happened in accpeted students : ${error}`);
    }
  }
);

export default router;
