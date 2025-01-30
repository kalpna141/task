import { Router } from "express";
import {
  createSubTask,
  deleteSubTask,
  getSubTask,
  updateSubTask,
} from "../../controllers/subTask/subTaskController.js";
import authenticate from "../../middleware/authMiddleware.js";

const subTask = Router();
subTask.get("/getSubTask", authenticate, getSubTask);
subTask.post("/createSubTask", authenticate, createSubTask);
subTask.delete("/deleteSubTask/:id", authenticate, deleteSubTask);
subTask.put("/updateSubTask/:id", authenticate, updateSubTask);

export default subTask;
