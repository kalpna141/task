import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "../../utils/socket";

const subtaskSlice = createSlice({
  name: "subtasks",
  initialState: { subtasks: [], error: null },
  reducers: {
    setSubtasks: (state, action) => {
      state.subtasks = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSubtasks, setError } = subtaskSlice.actions;

export const fetchSubtasks = (taskId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/subtask?taskId=${taskId}`
    );
    dispatch(setSubtasks(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const updateSubtask =
  (subtaskId, updatedSubtask) => async (dispatch) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/subtask/${subtaskId}`,
        updatedSubtask
      );
      socket.emit("taskUpdated", response.data);
      dispatch(fetchSubtasks(updatedSubtask.taskId));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

export default subtaskSlice.reducer;
