import * as UserController from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.get("/", UserController.getUsers);

export default router;
