import express, { Request, Response, Application } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
// Routes
import companyRouter from "./routes/companyRoutes";
import userRouter from "./routes/userAuth";
import studentRouter from "./routes/studentSupervisor";
//** CONFIG **/
const app: Application = express();
dotenv.config();

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

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
