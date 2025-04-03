import express from "express";
import { registerUser, loginUser, checkAuth ,userLogOut} from "../controllers/userController.js";


const router = express.Router();

router.post("/faculty-register", registerUser);
router.post("/facultylogin", loginUser);
router.get("/checkToken", checkAuth);
router.get("/faculty-logout",userLogOut);

export default router;
