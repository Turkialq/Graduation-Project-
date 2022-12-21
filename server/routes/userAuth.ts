import express, { Request, Response, Router, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";

type studentUniSupervisor = {
  firstName: string;
  familyName: string;
  phoneNumber: string;
  email: string;
  password: string;
  gender: string;
  major: string;
  university: string;
};

const prisma = new PrismaClient();
const router: Router = express.Router();

const generateAcessToken = (user: any) => {
  return jwt.sign(user, process.env.ACESS_TOKEN_SECRET!, { expiresIn: "15d" });
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null) return res.sendStatus(404);
  jwt.verify(
    token,
    process.env.ACESS_TOKEN_SECRET!,
    (error: any, user: any) => {
      if (error) return res.sendStatus(403);
      req.body.user = user;
      next();
    }
  );
};

router.post("/register-student", async (req: Request, res: Response) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const userInfo = {
      firstName: req.body.name,
      fatherName: req.body.fatherName,
      familyName: req.body.familyName,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      intrest: req.body.intrest,
      major: req.body.major,
      university: req.body.university,
    };

    // await prisma.student.create({
    //   data: {
    //     firstName: userInfo.firstName,
    //     fatherName: userInfo.fatherName,
    //     lastName: userInfo.familyName,
    //     email: userInfo.email,
    //     password: hashedPassword,
    //     gender: userInfo.gender,
    //     interest: userInfo.intrest,
    //     major: userInfo.major,
    //   },
    // });
  } catch {
    res.status(500).send();
  }

  res.json("user has been registered in the system");
});
router.post(
  "/register-student-supervisor-university",
  async (req: Request, res: Response) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const userInfo: studentUniSupervisor = {
        firstName: req.body.name,
        familyName: req.body.familyName,
        email: req.body.email,
        password: hashedPassword,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        major: req.body.major,
        university: req.body.university,
      };
      const uniAdmin = await prisma.universityAdmin.findUnique({
        where: { id: 1 },
      });

      const supervisor = await prisma.studentSupervisor.create({
        data: {
          name: userInfo.firstName as any,
          lastName: userInfo.familyName as any,
          email: userInfo.email as any,
          password: hashedPassword as any,
          phoneNumber: userInfo.phoneNumber as any,
          gender: userInfo.gender as any,
          major: userInfo.major as any,
          admin: { connect: { id: uniAdmin?.id } },
        },
      });
      res
        .status(200)
        .send(`supervisor${supervisor.name} was added to the system`);
    } catch (error) {
      res.status(500).send(error);
      console.error(error);
    }
  }
);
router.post(
  "/register-student-supervisor-university",
  async (req: Request, res: Response) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const userInfo = {
        firstName: req.body.name,
        familyName: req.body.familyName,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
        university: req.body.university,
      };
    } catch {
      res.status(500).send();
    }

    res.json("user has been registered in the system");
  }
);

router.post("/login", async (req: Request, res: Response) => {});
router.post("/refresh-token", async (req: Request, res: Response) => {});
router.delete("/logout", async (req: Request, res: Response) => {});

module.exports = router;
