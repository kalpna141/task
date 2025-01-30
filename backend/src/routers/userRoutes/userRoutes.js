import { Router } from "express";
import {
  getUsers,
  login,
  register,
} from "../../controllers/users/userControllers.js";
import authenticate from "../../middleware/authMiddleware.js";

const userRoute = Router();
userRoute.post("/register", register);
userRoute.post("/login", login);
userRoute.get("/getUsers", authenticate, getUsers);

export default userRoute;
