import express from "express";
// import { registerUser, loginUser, checkAuth ,userLogOut ,userRole} from "../controllers/userController.js";
import {registerStoreman, loginStoreman, storeManToken, storemanLogOut} from "../controllers/storManController.js"
const router = express.Router();

router.post("/register-storeman", registerStoreman);
router.post("/login-storeman", loginStoreman);
router.get("/checkToken", storeManToken);
router.post("/logout-storeman",storemanLogOut)



export default router;
