import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
const signUpController = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    if (!req.body.password) {
      const error = new Error("Password is required");
      error.name = "ValidationError";
      throw error;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPassword;
    const user = await User.create([req.body], { session });
    await session.commitTransaction();
    const token = jwt.sign(
      {
        userId: user[0]._id,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN },
    );
    res.status(201).json({
      data: {
        token,
        username: user[0].username,
        email: user[0].email,
      },
      success: true,
      message: "User Signed Up successfully",
    });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
};
export { signUpController };
