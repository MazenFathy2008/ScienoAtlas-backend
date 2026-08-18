import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
export default async function checkAuthController(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      const error = new Error("Token doesn't exist");
      error.statusCode = 401;
      throw error;
    }
    const data = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(data.userId);
    if (!user) {
      const error = new Error("User doesn't exist");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "User is authenticated",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
}
