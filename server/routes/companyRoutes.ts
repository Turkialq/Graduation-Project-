// submit to company
// get company list
// company status
import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router: Router = express.Router();

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
