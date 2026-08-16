import express from "express";
import { signUpController } from "../controllers/signUp.controller.js";
const signUp = express.Router();
signUp.post("/", signUpController);
export default signUp;
