import express from "express";
import { registerStoreman,storemanLogOut} from "../controllers/storemanController.js";


const router = express.Router();

router.post("/register-storeman", registerStoreman);
// router.post("/facultylogin", loginFaculty);
// router.get("/checkToken", checkAuth);
router.post("/logout-storeman",storemanLogOut);

export default router;