import * as StandardEventController from "../controllers/standardEvent.controller";
import express from "express";

const router = express.Router();

router.get("/", StandardEventController.getEvents);

export default router;
