import express, { Request, Response, Router, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
type student = {
  firstNmae: string;
  fatherName: string;
  familyName: string;
  phoneNumber: string;
  gpa: string;
  email: string;
  password: string;
  gender: string;
  intrest: string;
  major: string;
  university: string;
};
type studentCompanySupervisor = {
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

// to generate the token for user when login happen
const generateAcessToken = (user: any) => {
  return jwt.sign(user, process.env.ACESS_TOKEN_SECRET!, { expiresIn: "15d" });
};

// check if the user has a valid token
// login after 2 days is fine without regenration of a new token
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null) {
    console.log("something went wrong with JWT ");
    return res.sendStatus(500);
  }
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
// have to get the other tables to make the student object
// such as university, univisity supervisor, company supervisor etc..
router.post("/register-student", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const userInfo: student = {
      firstNmae: req.body.name,
      fatherName: req.body.fatherName,
      familyName: req.body.familyName,
      phoneNumber: req.body.phoneNumber,
      gpa: req.body.gpa,
      email: req.body.email,
      password: hashedPassword,
      gender: req.body.gender,
      intrest: req.body.intrest,
      major: req.body.major,
      university: req.body.university,
    };
    const university = await prisma.university.findFirst({
      where: { name: userInfo.university },
    });
    const uniSupervisor = await prisma.studentSupervisor.findFirst({
      where: { name: "تركي" },
    });
    const uniAdmin = await prisma.universityAdmin.findFirst({
      where: { name: "faisal" },
    });

    await prisma.student.create({
      data: {
        firstName: userInfo.firstNmae as any,
        fatherName: userInfo.fatherName as any,
        lastName: userInfo.familyName as any,
        email: userInfo.email as any,
        password: hashedPassword as any,
        gender: userInfo.gender as any,
        major: userInfo.major as any,
        phoneNumber: userInfo.phoneNumber as any,
        gpa: userInfo.gpa as any,
        interest: userInfo.intrest as any,
        supervisor: { connect: { id: uniSupervisor?.id } } as any,
        admin: { connect: { id: uniAdmin?.id } } as any,
        university: { connect: { id: university?.id } } as any,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
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

      await prisma.studentSupervisor.create({
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
      res.status(200);
    } catch (error) {
      res.status(500);
      console.error(error);
    }
  }
);
router.post(
  "/register-student-supervisor-company",
  async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const userInfo = {
        firstName: req.body.name,
        familyName: req.body.familyName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hashedPassword,
        gender: req.body.gender,
        company: req.body.company,
        major: req.body.major,
      };

      const company = await prisma.company.findFirst({
        where: {
          name: userInfo.company,
        },
      });

      await prisma.companySupervisor.create({
        data: {
          name: userInfo.firstName as any,
          lastName: userInfo.familyName as any,
          email: userInfo.email as any,
          phoneNumber: userInfo.phoneNumber as any,
          password: userInfo.password as any,
          gender: userInfo.gender as any,
          major: "" as any,
          company: { connect: { id: company?.id } as any },
        },
      });
      console.log("company supervisor registered");
      res.json("Registration complete");
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  }
);

router.post("/login-student", async (req: Request, res: Response) => {
  try {
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    const user = await prisma.student.findFirst({
      where: {
        email: userInfo.email,
      },
    });

    if (user) {
      const result = bcrypt.compareSync(userInfo.password, user.password);
      if (!result) return res.sendStatus(500);

      const acessToken = generateAcessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!);
      await prisma.usedTokens.create({
        data: {
          Token: refreshToken,
        },
      });
      res.json({
        acessToken: acessToken,
        refreshToken: refreshToken,
        role: "student",
      });
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.post(
  "/login-student-supervisor-university",
  async (req: Request, res: Response) => {
    try {
      const userInfo = {
        email: req.body.name,
        password: req.body.password,
        role: req.body.role,
      };

      const user = await prisma.studentSupervisor.findFirst({
        where: { email: userInfo.email },
      });

      if (user) {
        const result = bcrypt.compareSync(userInfo.password, user.password);
        if (!result) return res.sendStatus(500);

        const acessToken = generateAcessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!);
        await prisma.usedTokens.create({
          data: {
            Token: refreshToken,
          },
        });
        res.json({
          acessToken: acessToken,
          refreshToken: refreshToken,
          role: "uniSupervisor",
        });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500).send(`error has happened ${error}`);
    }
  }
);
router.post(
  "/login-student-supervisor-company",
  async (req: Request, res: Response) => {
    try {
      const userInfo = {
        email: req.body.name,
        password: req.body.password,
        role: req.body.role,
      };

      const user = await prisma.companySupervisor.findFirst({
        where: {
          email: userInfo.email,
        },
      });

      if (user) {
        const result = bcrypt.compareSync(userInfo.password, user.password);
        if (!result) return res.sendStatus(500);

        const acessToken = generateAcessToken(user);
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!);
        await prisma.usedTokens.create({
          data: {
            Token: refreshToken,
          },
        });
        res.json({
          acessToken: acessToken,
          refreshToken: refreshToken,
          role: "companySupervisor",
        });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);
router.post("/refresh-token", async (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  const isThereToken = await prisma.usedTokens.findFirst({
    where: {
      Token: refreshToken,
    },
  });
  if (isThereToken == null) return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    (error: any, user: any) => {
      if (error) return res.sendStatus(403);
      const acessToken = generateAcessToken({ name: user.name });
      res.json({ acessToken: acessToken });
    }
  );
});
router.delete("/logout", async (req: Request, res: Response) => {
  const deletedToken = req.body;
  console.log(deletedToken);
  try {
    const isThereToken = await prisma.usedTokens.findFirst({
      where: {
        Token: deletedToken,
      },
    });
    if (isThereToken) {
      await prisma.usedTokens.delete({
        where: {
          id: isThereToken.id,
        },
      });
      res.sendStatus(204);
      console.log("Token Deleted upon logouit");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500).send("error has happened");
  }
});

export default router;
