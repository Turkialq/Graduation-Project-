// pakages
import express, { Request, Response, Application } from "express";
import cors from "cors";
import https from "https";
import { Server } from "socket.io";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
// Routes
import studentRouter from "./routes/StudentRoutes";
import userRouter from "./routes/userAuthRoutes";
import notificationRouter from "./routes/notificationRoutes";
import taskRouter from "./routes/weeklyTaskRoutes";
import companySupervisorRouter from "./routes/companySupervisorRoutes";
import universitySupervisorRouter from "./routes/universitySupervisorRoutes";
import submitionRouter from "./routes/companySubmitionsRoutes";

//** CONFIG **/
const app: Application = express();
dotenv.config();
const FILE_Directiry = path.resolve(
  "/Users/turkialqahtani/Desktop/GP2/server/file-uploads"
);

//** SSL_SERVER **//
const SSL_SERVER = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);

//** SOCKET_SERVER **//
const io = new Server(SSL_SERVER, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

//** MIDDLEWARE **/
app.use(bodyParser.json());
app.use("/uploads", express.static(FILE_Directiry));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/user", userRouter);
app.use("/student", studentRouter);
app.use("/tasks", taskRouter);
app.use("/notification", notificationRouter);
app.use("/supervisor", companySupervisorRouter);
app.use("/university-supervisor", universitySupervisorRouter);
app.use("/submition", submitionRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the back");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callended");
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", ({ to, signal }) => {
    io.to(to).emit("callaccepted", signal);
  });
});

SSL_SERVER.listen(process.env.PORT, () => {
  console.log(`secure server on port ${process.env.PORT}`);
});
