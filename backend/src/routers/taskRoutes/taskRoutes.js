import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
  updateTaskByStatus,
} from "../../controllers/tasks/taskControllers.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const taskRoute = Router();
taskRoute.get("/getTask", authMiddleware, getTask);
taskRoute.post("/createTask", authMiddleware, createTask);
taskRoute.put("/tasks/:id", authMiddleware, updateTask);
taskRoute.put("/tasks/:id", authMiddleware, deleteTask);
taskRoute.patch("/tasks/:id", authMiddleware, updateTaskByStatus);
deleteTask;

export default taskRoute;
