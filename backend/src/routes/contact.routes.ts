import * as ContactController from "../controllers/contact.controller";
import express from "express";

const router = express.Router();

router.get("/", ContactController.getContacts);

export default router;
