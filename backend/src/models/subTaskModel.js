import mongoose, { Schema } from "mongoose";

const SubtaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending",
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
});
export const SubTask = mongoose.model("SubTask", SubtaskSchema);
