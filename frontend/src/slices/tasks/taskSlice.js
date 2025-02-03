import { createSlice } from "@reduxjs/toolkit";
import {
  addTaskToApi,
  getAllTasks,
  updateTaskStatus,
  updateTaskToApi,
  addSubtaskToApi,
} from "./taskApi";

const initialState = {
  tasks: [],
  showModal: false,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      state.showModal = !state.showModal;
      if (action.payload) {
        state.modalType = action.payload;
      }
    },
    addTaskSuccess: (state, action) => {
      state.tasks.push(action.payload);
    },
    addSubtaskSuccess: (state, action) => {
      const { taskId, subtask } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        task.subtasks.push(subtask);
      }
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateTaskSuccess: (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
    updateTaskStatusSuccess: (state, action) => {
      const updatedTask = action.payload;
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks[index] = updatedTask;
      }
    },
  },
});

export const {
  toggleModal,
  addTaskSuccess,
  setTasks,
  setLoading,
  setError,
  addSubtaskSuccess,

  updateTaskSuccess,
  updateTaskStatusSuccess,
} = taskSlice.actions;

export const addTask = (taskData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const task = await addTaskToApi(taskData);
    dispatch(addTaskSuccess(task));
    const tasks = await getAllTasks();
    dispatch(setTasks(tasks));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const addSubtask = (taskId, subtaskData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const subtask = await addSubtaskToApi(taskId, subtaskData);
    dispatch(addSubtaskSuccess({ taskId, subtask }));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const updateTaskByStatus = (taskId, newStatus) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const updatedTask = await updateTaskStatus(taskId, newStatus);
    dispatch(updateTaskStatusSuccess(updatedTask));
    const tasks = await getAllTasks();
    dispatch(setTasks(tasks));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const updateTask = (taskId, updatedTask) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const task = await updateTaskToApi(taskId, updatedTask);
    dispatch(updateTaskSuccess(task));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const getTasks = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const tasks = await getAllTasks();
    dispatch(setTasks(tasks));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default taskSlice.reducer;
