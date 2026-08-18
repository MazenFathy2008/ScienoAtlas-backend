import express from "express";
import checkAuthController from "../controllers/checkAuth.controller.js";
const checkAuth = express.Router();
checkAuth.get("/", checkAuthController);
export default checkAuth
