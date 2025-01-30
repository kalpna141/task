import express from "express";
import { configDotenv } from "dotenv";
import userRoute from "./routers/userRoutes/userRoutes.js";
import taskRoute from "./routers/taskRoutes/taskRoutes.js";
import subTask from "./routers/subTaskRoutes.js/subtaskRoutes.js";
import { connectToDb } from "./config/db/connection.js";
import cors from "cors";

configDotenv();

const app = express();
const port = process.env.PORT || 8001;
connectToDb();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/tasks", taskRoute);
app.use("/api/subtask", subTask);

app.listen(() => {
  console.log(`server is running on port ${port}`);
});
