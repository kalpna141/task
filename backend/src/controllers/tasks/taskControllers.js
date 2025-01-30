import { Task } from "../../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, status, priority, assignee, duedate, subtask } = req.body;
    const task = new Task({
      title,
      status,
      priority,
      assignee,
      duedate,
      subtask,
    });
    await task.save();
    res.status(201).json({
      message: "Task Created successfully",
      status: true,
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

export const getTask = async (req, res) => {
  try {
    const tasks = await Task.find({})
      .populate("assignee", "name email")
      .populate("subtasks")
      .exec();

    res.status(200).json({
      message: "Task fetched sucessfully",
      status: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
