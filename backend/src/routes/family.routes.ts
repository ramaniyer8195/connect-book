import express from "express";
import * as FamilyController from "../controllers/family.controller";

const router = express.Router();

router.get("/", FamilyController.getFamily);

export default router;
