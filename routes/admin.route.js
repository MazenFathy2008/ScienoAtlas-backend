import express from "express";
import getStatistics from "../controllers/admin/statistics.controller.js";
import {
  getPapers,
  updateState,
} from "../controllers/admin/papers.controller.js";
const admin = express.Router();
admin.get("/statistcs", getStatistics);
admin.get("/papers", getPapers);
admin.patch("/papers/:id", updateState);
export default admin;
