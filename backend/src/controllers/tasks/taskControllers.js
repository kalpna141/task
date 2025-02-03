import { Task } from "../../models/taskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, status, priority, assignee, duedate, subtask } = req.body;
    const sub = Array.isArray(subtask)
      ? subtask.filter((id) => mongoose.Types.ObjectId.isValid(id))
      : [];
    const task = new Task({
      title,
      status,
      priority,
      assignee,
      duedate,
      subtask: sub,
    });
    await task.save();
    res.status(201).json({
      message: "Task Created successfully",
      status: true,
      data: task,
    });
  } catch (error) {
    console.log("error", error.message);
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
      .populate("subtask")
      .exec();

    res.status(200).json({
      message: "Task fetched sucessfully",
      status: true,
      data: tasks,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Task updated successfuly",
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

export const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Task deleted successfuly",
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

export const updateTaskByStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Status of task updated successfully",
      status: true,
      data: updatedTask,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};
