import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuth";

const prisma = new PrismaClient();
const router: Router = express.Router();
// first find the student and map it to the supervisor
router.get(
  "/student-dashboard-information",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    try {
      const student = await prisma.student.findFirst({
        where: { firstName: firstName, lastName: lastName },
        select: {
          firstName: true,
          lastName: true,
          major: true,
          university: true,
          supervisor: true,
          gpa: true,
        },
      });

      // now get the student supervisor info
      const studentSupervisor = await prisma.studentSupervisor.findUnique({
        where: {
          id: student?.supervisor.id as any,
        },
      });

      const result = {
        studentFirstName: student?.firstName,
        studentLastName: student?.lastName,
        studentUniversity: student?.university.name,
        studentGPA: student?.gpa,
        studentUniSupervisor: studentSupervisor?.name,
      };

      res.json(result);
    } catch (error) {
      res.status(500);
      // console.log(`ERROR_STUDENT_INFORMATION:${error}`);
    }
  }
);

export default router;
