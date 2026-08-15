import express from "express";
import { publishPaper } from "../controllers/puplish.controller.js";
import upload from "../config/multer.js";
const Publish = express.Router();
Publish.post("/", upload.single("pdf"), publishPaper);
export default Publish;
