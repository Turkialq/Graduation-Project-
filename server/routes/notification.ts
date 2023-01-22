// get notifications for users
import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuth";

const prisma = new PrismaClient();
const router: Router = express.Router();

router.get(
  "/get-student-notifications",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body.user;

    try {
      const student = await prisma.student.findFirst({
        where: {
          firstName: firstName,
          lastName: lastName,
        },
      });

      const notifications = await prisma.studentNotification.findMany({
        where: {
          studentID: student?.id,
        },
      });

      // console.log(notifications);
      res.json(notifications);
    } catch (error) {
      console.log(`error from student notification: ${error}`);
      res.sendStatus(500);
    }
  }
);

router.get(
  "/get-student-supervisor-notifications",
  authenticateToken,
  async (req: Request, res: Response) => {
    res.json("OK");
  }
);

router.get(
  "/get-company-supervisor-notifications",
  authenticateToken,
  async (req: Request, res: Response) => {
    res.json("OK");
  }
);

export default router;
