import * as UserController from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.get("/getAuthUser", UserController.getAuthUser);
router.get("/user/:userId", UserController.getUser);
router.delete("/user/:userId", UserController.deleteUser);
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

export default router;
