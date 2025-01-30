import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connection established");
  } catch (error) {
    console.log("connection failed");
  }
};
