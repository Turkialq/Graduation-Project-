import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authenticateToken } from "../index";

const prisma = new PrismaClient();
const router: Router = express.Router();

const generateAcessToken = (user: any) => {
  return jwt.sign(user, process.env.ACESS_TOKEN_SECRET!, { expiresIn: "15d" });
};

router.post("/register", async (req: Request, res: Response) => {});
router.post("/login", async (req: Request, res: Response) => {});
router.post("/refresh-token", async (req: Request, res: Response) => {});
router.delete("/logout", async (req: Request, res: Response) => {});

module.exports = router;
