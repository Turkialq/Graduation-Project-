import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuthRoutes";
import fileUpload from "express-fileupload";
import path from "path";

const prisma = new PrismaClient();
const router: Router = express.Router();
const FILE_Directiry = path.resolve("../GP2/server/file-uploads");

router.use(fileUpload());

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
  async (req: any, res: Response) => {
    const filename = req.files.file.name;
    const file = req.files.file;
    let uploadPath = FILE_Directiry + "/" + filename;

    file.mv(uploadPath, (err: any) => {
      if (err) {
        console.log(`error happend in student file-upload` + err);
        return res.send(500);
      }
      res.send("ok");
    });
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
