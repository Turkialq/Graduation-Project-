// submit to company
// get company list
// company status
import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuth";

const prisma = new PrismaClient();
const router: Router = express.Router();
// get all company in the platform as json
router.get(
  "/get-company-list",
  authenticateToken,
  async (req: Request, res: Response) => {
    console.log("HIT POINT COMPANY LIST");
    try {
      const result = await prisma.company.findMany();
      // change it to arabic --> better front-end format
      res.json(result);
    } catch (error) {
      console.log(`COMPANY-LIST ERROR :${error}`);
      res.sendStatus(500);
    }
  }
);

router.post("/register-company", async (req: Request, res: Response) => {
  try {
    await prisma.company.createMany({
      data: [
        {
          name: "الهيئة الملكية للجبيل وينبع",
          type: "governmental",
          field: "Infrastructure",
          location: "ينبع",
        },
        {
          name: "الهيئة العامة للغذاء والدواء",
          type: "govermental",
          field: "Medical",
          location: "الرياض",
        },
        {
          name: "الهيئة العامة للطيران المدني",
          type: "govermental",
          field: "Flight",
          location: "الرياض",
        },
        {
          name: "الهيئة العامة للترفيه",
          type: "governmental",
          field: "Entertainment",
          location: "all",
        },
        {
          name: "الهيئة العامة للإحصاء",
          type: "governmental",
          field: "Statistics",
          location: "all",
        },
      ],
    });
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
  res.send("Added");
});

export default router;
