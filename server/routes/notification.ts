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

    // const page = parseInt(req.query.page as string);
    // const limit = parseInt(req.query.limit as string);

    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit;

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

      const numberOfNotification = await prisma.studentNotification.count({
        where: { studentID: student?.id as any },
      });

      // const result = {
      //   next: { page: page, limit: limit },
      //   previous: {
      //     page: page,
      //     limit: limit,
      //   },
      //   results: {},
      //   total: Math.ceil(numberOfNotification / limit),
      // };

      // if (endIndex < numberOfNotification)
      //   result.next = {
      //     page: page + 1,
      //     limit: limit,
      //   };

      // if (startIndex > 0) {
      //   result.previous = {
      //     page: page - 1,
      //     limit: limit,
      //   };
      // }

      // result.results = await prisma.studentNotification.findMany({
      //   where: { studentID: student?.id },
      //   skip: startIndex,
      //   take: limit,
      //   select: {
      //     title: true,
      //     subTitle: true,
      //   },
      // });

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
