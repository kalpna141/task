import { Router } from "express";
import {
  createSubTask,
  deleteSubTask,
  getSubTask,
  updateSubTask,
} from "../../controllers/subTask/subTaskController.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const subTask = Router();
subTask.get("/getSubTask/:taskId", authMiddleware, getSubTask);

subTask.post("/createSubTask", authMiddleware, createSubTask);
subTask.delete("/deleteSubTask/:id", authMiddleware, deleteSubTask);
subTask.put("/updateSubTask/:id", authMiddleware, updateSubTask);

export default subTask;
