import express, { Request, Response, Application } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";

const app: Application = express();
const userRouter = require("./routes/userAuth");

dotenv.config();

//** MIDDLEWARE **/
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the back");
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
