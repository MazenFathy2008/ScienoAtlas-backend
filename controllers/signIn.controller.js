import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
const signInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error();
      error.statusCode = 401;
      error.errorCode = "INVALID_CREDENTIALS";
      throw error;
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      const error = new Error();
      error.statusCode = 401;
      error.errorCode = "INVALID_CREDENTIALS";
      throw error;
    }
    const token = jwt.sign({ userId: user._doc._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });
    res.json({
      data: {
        ...user._doc,
        password: null,
      },
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export { signInController };
