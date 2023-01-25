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
//get the (title & subtitle) and look for them to delete
router.delete(
  "/delete-student-notifications",
  authenticateToken,
  async (req: Request, res: Response) => {
    const title = parseInt(req.query.title as string);
    const subTitle = parseInt(req.query.subTitle as string);
    try {
      await prisma.studentNotification.deleteMany({
        where: {
          title: title as any,
          subTitle: subTitle as any,
        },
      });
    } catch (error) {
      res.sendStatus(500);
      console.log(`error: ${error}`);
    }

    res.json("OK");
  }
);

router.delete(
  "/delete-student-supervisor-notifications",
  authenticateToken,
  async (req: Request, res: Response) => {
    const title = parseInt(req.query.title as string);
    const subTitle = parseInt(req.query.subTitle as string);
    try {
      await prisma.studentSupervisorNotification.deleteMany({
        where: {
          title: title as any,
          subTitle: subTitle as any,
        },
      });
    } catch (error) {
      res.sendStatus(500);
      console.log(`error: ${error}`);
    }
    res.json("OK");
  }
);

router.delete(
  "/delete-company-supervisor-notifications",
  authenticateToken,
  async (req: Request, res: Response) => {
    const title = parseInt(req.query.title as string);
    const subTitle = parseInt(req.query.subTitle as string);
    try {
      await prisma.companySupervisorNotification.deleteMany({
        where: {
          title: title as any,
          subTitle: subTitle as any,
        },
      });
    } catch (error) {
      res.sendStatus(500);
      console.log(`error: ${error}`);
    }
    res.json("OK");
  }
);

export default router;
