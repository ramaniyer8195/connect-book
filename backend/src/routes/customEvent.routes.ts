import * as CustomEventController from "../controllers/customEvent.controller";
import express from "express";

const router = express.Router();

router.get("/", CustomEventController.getEvents);
router.post("/create", CustomEventController.createCustomEvent);

export default router;
