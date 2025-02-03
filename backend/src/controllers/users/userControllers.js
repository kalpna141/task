import { generateToken } from "../../config/generateToken.js";
import { User } from "../../models/userModel.js";
import Validator from "validatorjs";
import bcrypt from "bcryptjs";
import { validateRequest } from "../../config/validation.js";

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
    let data = {
      name,
      email,
      password,
    };

    let rules = {
      name: "required|min:4",
      email: "required|email",
      password:
        "required|min:8|max:18|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&])[A-Za-z\\d@.#$!%*?&]{8,18}$/",
    };
    const { isValid, message } = validateRequest(data, rules);
    if (!isValid) {
      return res.status(400).json({ message, status: false });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
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
    return res.status(201).json({
      message: "User registered successfully",
      status: true,
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let data = {
      email,
      password,
    };
    let rules = {
      email: "required|email",
      password:
        "required|min:8|max:18|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@.#$!%*?&])[A-Za-z\\d@.#$!%*?&]{8,18}$/",
    };
    const { isValid, message } = validateRequest(data, rules);
    if (!isValid) {
      return res.status(400).json({ message, status: false });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not registered",
        status: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
        status: false,
      });
    }
    const token = generateToken(user);
    return res.status(200).json({
      message: "User Login successfully",
      email,
      token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal Server Error",
      status: false,
    });
  }
};
