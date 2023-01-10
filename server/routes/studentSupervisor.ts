import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuth";

const prisma = new PrismaClient();
const router: Router = express.Router();
// first find the student and map it to the supervisor
router.get(
  "/student-uni-supervisor",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const student = prisma.student.findFirst({});
    } catch (error) {}
  }
);

export default router;
