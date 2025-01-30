import { Router } from "express";
import {
  createTask,
  getTask,
} from "../../controllers/tasks/taskControllers.js";
import authenticate from "../../middleware/authMiddleware.js";

const taskRoute = Router();
taskRoute.get("/getTask", authenticate, getTask);
taskRoute.post("/createTask", authenticate, createTask);

export default taskRoute;
