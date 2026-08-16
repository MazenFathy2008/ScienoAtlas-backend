import express from "express";
import { signUpController } from "../controllers/signUp.controller.js";
const LogIn = express.Router();
export default LogIn;

LogIn.post("/", signUpController);
