import axios from "axios";
import { toast } from "react-toastify";
const API_URL = "http://localhost:3001/api/users";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    if (response?.status === 201) {
      toast.success(response?.data?.message);
      return response.data;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response?.status === 200) {
      toast.success(response?.data?.message);
      localStorage.setItem("token", response?.data?.token);
      return response.data;
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
};
