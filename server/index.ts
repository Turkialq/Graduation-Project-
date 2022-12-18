import express, { Request, Response, NextFunction, Application } from "express";
import path from "path";
import cors from "cors";
import fs from "fs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

const app: Application = express();
const userRouter = require("./routes/userAuth");

dotenv.config();

//** MIDDLEWARE **/
app.use(bodyParser.raw({ type: "application/octet-stream", limit: "100mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

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

app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the back");
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
