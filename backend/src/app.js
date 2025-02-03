import express from "express";
import { configDotenv } from "dotenv";
import userRoute from "./routers/userRoutes/userRoutes.js";
import taskRoute from "./routers/taskRoutes/taskRoutes.js";
import subTask from "./routers/subTaskRoutes/subtaskRoutes.js";
import { connectToDb } from "./config/db/connection.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

configDotenv();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
connectToDb();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/subtask", subTask);
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.emit("connectionSuccess", {
    message: "Successfully connected to the server!",
  });

  socket.on("taskUpdated", async (data) => {
    io.emit("taskUpdated", { data });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const port = process.env.PORT || 8001;

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
