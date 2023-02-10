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
      const result = await prisma.studentSupervisor.findFirst({
        where: {
          name: firstName,
          lastName: lastName,
        },
      });

      console.log(result);
      res.send("okay");
    } catch (error) {
      res.sendStatus(500);
      console.log(`Error happened at uni dashboard info: ${error}`);
    }
  }
);

export default router;
