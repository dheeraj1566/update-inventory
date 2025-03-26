import express from "express";
import { registerUser, loginUser, checkAuth } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/checkToken", checkAuth)

export default router;
