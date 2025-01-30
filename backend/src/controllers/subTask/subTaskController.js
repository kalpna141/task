import { SubTask } from "../../models/subTaskModel.js";
export const getSubTask = async (req, res) => {
  try {
    const subtasks = await Subtask.find().populate({
      path: "task",
      select: "title status",
    });

    res.status(200).json({
      success: true,
      message: "Subtasks fetched successfully",
      data: subtasks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createSubTask = async (req, res) => {
  try {
    const { title, status, priority, assignee, duedate, subtask } = req.body;
    const subTask = new SubTask({
      title,
      status,
    });
    await subTask.save();
    res.status(201).json({
      message: "Subtask Created successfully",
      status: true,
      data: subTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

export const updateSubTask = async (req, res) => {
  try {
    const subtask = await Subtask.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: "Subtask updated successfully",
      status: true,
      data: subtask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

export const deleteSubTask = async (req, res) => {
  try {
    const subtask = await Subtask.findByIdAndDelete(req.params.id);
    await Task.updateMany({}, { $pull: { subtasks: subtask._id } });

    res.status(201).json({
      message: "Subtask deleted successfully",
      status: true,
      data: subtask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};
