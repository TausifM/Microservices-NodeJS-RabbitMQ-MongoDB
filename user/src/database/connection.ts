import mongoose from "mongoose";
import { CONFIG } from "../config";

const connectDB = async (): Promise<void> => {
  try {
    if (typeof CONFIG.DB_URL === "string") {
      await mongoose.connect(CONFIG.DB_URL);
      console.log("--DB Connected--");
    }
  } catch (error) {
    console.log("-----Error-----");
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
