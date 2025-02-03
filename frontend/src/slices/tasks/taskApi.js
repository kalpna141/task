import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3001/api/tasks";
const token = localStorage.getItem("token");

export const addTaskToApi = async (userData) => {
  try {
    if (!token) {
      throw new Error("No token found. Please login again.");
    }
    const response = await axios.post(`${API_URL}/createTask`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response?.status === 201) {
      toast.success(response?.data?.message);
      return response.data.task;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    if (!token) {
      throw new Error("No token found. Please login again.");
    }
    const response = await axios.get(`${API_URL}/getTask`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.status === 200) {
      return response?.data?.data;
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error?.response?.data?.message);
    throw error;
  }
};

export const updateTaskToApi = async (taskId, updatedTask) => {
  try {
    if (!token) {
      throw new Error("No token found. Please login again.");
    }
    const response = await axios.put(`${API_URL}/${taskId}`, updatedTask, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response?.status === 200) {
      toast.success(response?.data?.message);
      return response?.data?.data;
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error?.response?.data?.message);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    if (!token) {
      throw new Error("No token found. Please login again.");
    }
    const response = await axios.patch(
      `${API_URL}/tasks/${taskId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response?.status === 200) {
      toast.success(response?.data?.message);
      return response?.data?.data;
    }
  } catch (error) {
    console.log("error", error);
    toast.error(error?.response?.data?.message);
    throw error;
  }
};

export const addSubtaskToApi = async (taskId, subtaskData) => {
  try {
    const response = await axios.post(
      `http://localhost:3001/api/subtask/createSubTask/${taskId}`,
      { subtaskData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to add subtask");
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
