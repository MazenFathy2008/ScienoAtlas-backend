import mongoose from "mongoose";

const userScheme = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLenght: 5,
    maxLenght: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLenght: 5,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please Enter a valid Email format"],
  },
  password: {
    type: String,
    required: true,
    minLenght: 8,
  },
  age: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
});
const User = mongoose.model("User", userScheme);
export default User;
