import * as ContactController from "../controllers/contact.controller";
import express from "express";

const router = express.Router();

router.get("/", ContactController.getContacts);
router.get("/contact/:contactId", ContactController.getContact);
router.put("/contact/:contactId", ContactController.updateContact);
router.delete("/contact/:contactId", ContactController.deleteContact);
router.post("/create", ContactController.createContact);
router.get("/favorites", ContactController.getFavorites);
router.get("/events/:month", ContactController.getUpcomingEvents);
router.get("/stats/contact", ContactController.getContactCount);
router.get("/stats/favorite", ContactController.getFavoriteCount);
router.get("/stats/family", ContactController.getFamilyCount);

export default router;
