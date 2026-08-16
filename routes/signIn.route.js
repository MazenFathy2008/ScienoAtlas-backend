import express from "express";
import { signInController } from "../controllers/signIn.controller.js";
const signIn = express.Router();
signIn.post("/", signInController);
export default signIn;
