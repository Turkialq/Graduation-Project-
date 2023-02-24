import express, { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./userAuthRoutes";
import multer from "multer";
import path from "path";

const prisma = new PrismaClient();
const router: Router = express.Router();
const FILE_Directiry = path.resolve("../GP2/server/file-uploads");

const storage = multer.diskStorage({
  destination: path.join(FILE_Directiry),
  filename: function (req, file, cb) {
    const fullName = file.originalname;
    cb(null, fullName);
  },
});
const upload = multer({ storage: storage });

// get list of task for a specific student
router.get(
  "/get-student-tasks",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body.user;
    try {
      const student = await prisma.student.findFirst({
        where: {
          firstName: firstName,
          lastName: lastName,
        },
      });

      const listOfTasks = await prisma.weeklyTasks.findMany({
        where: {
          StudentTempId: student?.id as any,
        },
      });

      const result = listOfTasks.map((task) => {
        const oldPath = task.assignmentPath;
        const newPath = oldPath.split("file-uploads/")[1];
        const today = task.deadline;

        return {
          ...task,
          deadline: today.toISOString().substring(0, 10),
          assignmentPath: newPath,
        };
      });

      console.log(result);
      res.json(result);
    } catch (error) {
      res.sendStatus(500);
      console.log(`Error : ${error}`);
    }
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
// will receive File object + metadata
// store the file into the file systme + store the absolute path into database + metadata
// when student wants to see the file + from the database URL display it to the client
// the client will use library that displaies Files such as PDF, PNG
router.post(
  "/create-student-task",
  upload.single("file"),
  authenticateToken,
  async (req: Request, res: Response) => {
    const { name, lastName } = req.body.user;

    const metadata = JSON.parse(req.body.task);

    const filePath = req.file?.path;

    try {
      const uniSupervisor = await prisma.studentSupervisor.findFirst({
        where: {
          name: name,
          lastName: lastName,
        },
        select: { id: true },
      });

      // notification for students
      // create task
      for (let i = 0; i < metadata.studentLists.length; i++) {
        console.log(metadata.studentLists[i]);
        const student = await prisma.student.findFirst({
          where: {
            firstName: metadata.studentLists[i] as any,
          },
          select: {
            id: true,
          },
        });

        await prisma.studentNotification.create({
          data: {
            title: "مهمة اسبوعية",
            subTitle: "تم الاعلان عن مهمة اسبوعية",
            studentID: student?.id as any,
          },
        });

        await prisma.weeklyTasks.create({
          data: {
            assignmentPath: filePath as string,
            title: metadata.task as string,
            description: metadata.description as string,
            deadline: metadata.deadline as any,
            StudentTempId: student?.id as any,
          },
        });
      }
      // notification for studentSupervisor
      await prisma.studentSupervisorNotification.create({
        data: {
          title: "تم رفع المهمة لي الطلاب" as any,
          subTitle: "تم رفع الواجب لي الطلاب" as any,
          studentSupervisorId: uniSupervisor?.id as any,
        },
      });

      res.json("ok");
    } catch (error) {
      res.sendStatus(500);
      console.log(`Error : ${error}`);
    }
  }
);

export default router;
