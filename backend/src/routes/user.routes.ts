import * as UserController from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.get("/getAuthUser", UserController.getAuthUser);
router.get("/user/:userId", UserController.getUser);
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.delete("/remove/:userId", UserController.removeUser);

export default router;
