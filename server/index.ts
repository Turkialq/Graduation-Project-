import express, { Request, Response, NextFunction, Application } from "express";
import { PrismaClient } from "@prisma/client";
import path from "path";
import cors from "cors";
import fs from "fs";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

const app: Application = express();
const prisma = new PrismaClient();

dotenv.config();

//** MIDDLEWARE **/
app.use(bodyParser.raw({ type: "application/octet-stream", limit: "100mb" }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the back");
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
