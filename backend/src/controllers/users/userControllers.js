import { generateToken } from "../../config/generateToken.js";
import { User } from "../../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      message: "User fetched Successfully",
      data: users,
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      res.status(400).json({
        message: "All fields are required",
        status: false,
      });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        message: "User already exists",
        status: false,
      });
    }
    const user = new User({
      name,
      email,
      password,
      role,
    });
    await user.save();
    res.status(201).json({
      message: "User registered successfully",
      status: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "All fields required",
        status: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        message: "User not registered",
        status: false,
      });
    }

    const token = generateToken(user);
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        email,
        password,
        token,
      });
    } else {
      res.status(401).json({
        message: "Invalid Credentials",
        status: false,
        data: token,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};
