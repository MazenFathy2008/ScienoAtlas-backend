import User from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
const signUpController = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
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
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      data: {
        name: user[0].name,
        email: user[0].email,
      },
      success: true,
    });
  } catch (err) {
    await session.abortTransaction();
    next(err);
  } finally {
    await session.endSession();
  }
};
export { signUpController };
