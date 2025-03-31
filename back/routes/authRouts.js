import express from "express";
import { registerUser, loginUser, checkAuth ,userLogOut} from "../controllers/userController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/checkToken", checkAuth);
router.get("/logout",userLogOut);

export default router;
