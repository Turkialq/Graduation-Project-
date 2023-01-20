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
    // console.log("HIT POINT COMPANY LIST");
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

router.get(
  "/get-submition-lists",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body.user;
    try {
      const user = await prisma.student.findFirst({
        where: {
          firstName: firstName,
          lastName: lastName,
        },
      });
      const submitions = await prisma.submissions.findMany({
        where: {
          studentID: user?.id,
        },
        select: {
          companyID: true,
          status: true,
        },
      });
      const companies = await prisma.company.findMany({
        where: {
          id: {
            in: submitions.map((obj) => {
              return obj.companyID;
            }) as any,
          },
        },
        select: {
          name: true,
          id: true,
        },
      });
      console.log(companies);
      console.log(submitions);
      const result = [];

      for (let i = 0; i < submitions.length; i++) {
        for (let j = 0; j < submitions.length; j++) {
          if (submitions[i].companyID === companies[j].id) {
            console.log(submitions[i], companies[j]);
            const temp = {
              company: companies[j].name,
              status: submitions[i].status,
            };
            result.push(temp);
          }
        }
      }
      console.log(result);

      res.json(result);
    } catch (error) {
      res.sendStatus(500);
      console.log(`ERROR IN SUBMITION LIST ${error}`);
    }
  }
);

router.post(
  "/submit-company",
  authenticateToken,
  async (req: Request, res: Response) => {
    console.log(req.body);
    const { firstName, lastName } = req.body.user;
    console.log(firstName, lastName);
    const { companyName }: any = req.query;
    console.log(companyName);

    try {
      const company = await prisma.company.findFirst({
        where: {
          name: companyName,
        },
      });
      const student = await prisma.student.findFirst({
        where: {
          firstName: firstName,
          lastName: lastName,
        },
      });
      console.log(student);
      console.log(company);
      const submition = await prisma.submissions.create({
        data: {
          status: "pending",
          studentID: student!.id as any,
          companyID: company!.id as any,
        },
      });
      res.json("Submited");
      console.log("Submited to a company");
      console.log(submition);
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
        // {
        //   name: "الهيئة الملكية للجبيل وينبع",
        //   type: "governmental",
        //   field: "Infrastructure",
        //   location: "ينبع",
        // },
        // {
        //   name: "الهيئة العامة للغذاء والدواء",
        //   type: "govermental",
        //   field: "Medical",
        //   location: "الرياض",
        // },
        // {
        //   name: "الهيئة العامة للطيران المدني",
        //   type: "govermental",
        //   field: "Flight",
        //   location: "الرياض",
        // },
        // {
        //   name: "الهيئة العامة للترفيه",
        //   type: "governmental",
        //   field: "Entertainment",
        //   location: "all",
        // },
        // {
        //   name: "الهيئة العامة للإحصاء",
        //   type: "governmental",
        //   field: "Statistics",
        //   location: "all",
        // },
        // {
        //   name: "الهيئة الملكية للجبيل وينبع",
        //   type: "governmental",
        //   field: "Infrastructure",
        //   location: "ينبع",
        // },
        // {
        //   name: "الهيئة العامة للغذاء والدواء",
        //   type: "govermental",
        //   field: "Medical",
        //   location: "الرياض",
        // },
        // {
        //   name: "الهيئة العامة للطيران المدني",
        //   type: "govermental",
        //   field: "Flight",
        //   location: "الرياض",
        // },
        // {
        //   name: "الهيئة العامة للترفيه",
        //   type: "governmental",
        //   field: "Entertainment",
        //   location: "all",
        // },
        // {
        //   name: "الهيئة العامة للإحصاء",
        //   type: "governmental",
        //   field: "Statistics",
        //   location: "all",
        // },
      ],
    });
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
  res.send("Added");
});

export default router;
