import express from "express";
import {registerAdmin, loginAdmin, checkAdmin, adminLogOut} from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/checkToken", checkAdmin);
router.post("/logout", adminLogOut)


export default router;
