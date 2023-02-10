import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuthRoutes";

const prisma = new PrismaClient();
const router: Router = express.Router();

router.get(
  "/company-supervisor-dashboard-information",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;

    try {
      const userInformation = await prisma.companySupervisor.findFirst({
        where: {
          name: firstName,
          lastName: lastName,
        },
      });
      const company = await prisma.company.findUnique({
        where: {
          id: userInformation?.companyId,
        },
      });
      const result = {
        firstName: userInformation?.name,
        lastName: userInformation?.lastName,
        companyName: company?.name,
      };
      res.json(result);
    } catch (error) {
      res.status(500);
      console.log(`Error in company supervisor route ${error}`);
    }
  }
);

export default router;
