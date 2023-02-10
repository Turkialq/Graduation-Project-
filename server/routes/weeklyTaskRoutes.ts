import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuthRoutes";

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

// student supervisor route
router.post(
  "/create-student-task",
  authenticateToken,
  async (req: Request, res: Response) => {
    res.send("ok");
  }
);

export default router;
