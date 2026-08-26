import express from "express";
import getStatistics from "../controllers/admin/statistics.controller.js";
const admin = express.Router();
admin.get("/statistcs", getStatistics);
export default admin;
