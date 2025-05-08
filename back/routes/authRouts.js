import express from 'express';
import { checkAuth,loginUser } from "../controllers/loginUsers.js";
// import { userLogOut } from "../controllers/adminController.js";
import {facultyLogOut} from "../controllers/facultyController.js"
import {accountantLogOut} from "../controllers/accountantController.js"
import {storemanLogOut} from "../controllers/storemanController.js"
import {adminLogOut} from "../controllers/adminController.js"
const router = express.Router();
router.post("/login", loginUser);
router.get("/checkToken", checkAuth);
// router.post("/logout",userLogOut);
router.post("/logout",facultyLogOut);
router.post("/logout",accountantLogOut);
router.post("/logout",storemanLogOut);
router.post("/logout",adminLogOut);
export default router;