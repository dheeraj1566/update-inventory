import express from "express";
import { loginFaculty, logoutFaculty,registerFaculty,checkFaculty } from "../controllers/facultyController.js";


const router = express.Router();

router.post("/faculty-register", registerFaculty);
router.post("/facultylogin", loginFaculty);
router.get("/checkfaculty", checkFaculty);
router.get("/faculty-logout",logoutFaculty);

export default router;
