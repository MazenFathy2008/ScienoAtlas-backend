import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const signUpController = async (req, res, next) => {
  try {
    if (!req.body.password) {
      const error = new Error("Password is required");
      error.name = "ValidationError";
      throw error;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPassword;
    const user = new User({
      ...req.body,
    });
    await user.save();
    res.status(201).json(req.body);
  } catch (err) {
    next(err);
  }
};
export { signUpController };
