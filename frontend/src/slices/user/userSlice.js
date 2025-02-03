import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token"); 
    },
  },
});

export const { setUsers, setError, logout } = userSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:3001/api/users/getUsers"
    );
    dispatch(setUsers(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default userSlice.reducer;
