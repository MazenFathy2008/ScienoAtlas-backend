import express from "express";
import getStatistics from "../controllers/admin/statistics.controller.js";
import { getPapers } from "../controllers/admin/papers.controller.js";
const admin = express.Router();
admin.get("/statistcs", getStatistics);
admin.get("/papers", getPapers);
export default admin;
