import express from "express";
import { publishPaper, getPapers } from "../controllers/puplish.controller.js";
import upload from "../config/multer.js";
const Publish = express.Router();
Publish.post("/", upload.single("pdf"), publishPaper);
Publish.get("/", getPapers);
export default Publish;
