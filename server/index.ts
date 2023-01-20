import express, { Request, Response, Application } from "express";
import cors from "cors";
import https from "https";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
// Routes
import companyRouter from "./routes/companyRoutes";
import userRouter from "./routes/userAuth";
import studentRouter from "./routes/studentSupervisor";

//** CONFIG **/
const app: Application = express();
dotenv.config();

//** SSL_SERVER **//
const SSL_SERVER = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

//** MIDDLEWARE **/
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/user", userRouter);
app.use("/student", studentRouter);
app.use("/company", companyRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the back");
});

SSL_SERVER.listen(process.env.PORT, () => {
  console.log(`secure server on port ${process.env.PORT}`);
});
