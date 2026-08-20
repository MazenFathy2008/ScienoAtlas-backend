import express from "express";
import paperLinkController from "../controllers/paperLink.controller.js";
const paperLink = express.Router();
paperLink.get("/:id", paperLinkController);
export default paperLink;
