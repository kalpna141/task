import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth/authSlice";
import taskReducer from "./slices/tasks/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

export default store;
