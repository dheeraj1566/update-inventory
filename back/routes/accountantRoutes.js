import express from "express";
import { registerAccountant,accountantLogOut} from "../controllers/accountantController.js";


const router = express.Router();

router.post("/register-accountant", registerAccountant);
router.post("/logout-accountant",accountantLogOut);

export default router;