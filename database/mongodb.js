import mongoose from "mongoose";
import { MONGODB_URI } from "../config/env.js";
if (!MONGODB_URI) {
  throw new Error("Can't found db url in env");
}
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB;
