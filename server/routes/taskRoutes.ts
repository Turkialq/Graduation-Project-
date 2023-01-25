import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuth";

const prisma = new PrismaClient();
const router: Router = express.Router();

router.get(
  "/get-student-tasks",
  authenticateToken,
  async (req: Request, res: Response) => {
    res.send("ok");
  }
);

router.post(
  "/upload-student-task",
  authenticateToken,
  async (req: Request, res: Response) => {
    res.send("ok");
  }
);

export default router;
