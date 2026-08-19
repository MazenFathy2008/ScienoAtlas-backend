import express from "express";
import signOutController from "../controllers/signOut.controller.js";

const signOut = express.Router();
signOut.post("/", signOutController);
export default signOut;
