import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuth";

const prisma = new PrismaClient();
const router: Router = express.Router();
// first find the student and map it to the supervisor
router.get(
  "/student-uni-supervisor",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    try {
      const student = prisma.student.findFirst({
        where: { firstName: firstName, lastName: lastName },
        select: {
          firstName: true,
          lastName: true,
          major: true,
          university: true,
          supervisor: true,
        },
      });
      console.log(`STUDENT_NAME:${student}`);

      // now get the student supervisor info
      const studentSupervisor = prisma.studentSupervisor.findUnique({
        where: {
          id: student.supervisor as any,
        },
      });
      console.log(`STUDENT_SUPER_NAME:${studentSupervisor}`);
    } catch (error) {}
  }
);

export default router;
