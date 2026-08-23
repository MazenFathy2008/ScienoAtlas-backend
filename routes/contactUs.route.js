import express from "express";
import contactUsController from "../controllers/contactUs.controller.js";

const contactUs = express.Router();
contactUs.post("/", contactUsController);

export default contactUs;
