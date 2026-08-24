import mongoose from "mongoose";
const userScheme = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 5,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please Enter a valid Email format",
      ],
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
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

    publisedPapers: {
      type: Object,
      required: true,
      default: {
        count: 0,
        listOfPapers: [],
      },
    },

    reasonOfjoining: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);
const User = mongoose.model("User", userScheme);

export default User;
