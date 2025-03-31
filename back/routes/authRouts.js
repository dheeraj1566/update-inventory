import express from "express";
<<<<<<< HEAD
import { registerUser, loginUser, checkAuth ,userLogOut} from "../controllers/userController.js";
=======
import { registerUser, loginUser, checkAuth, userLogOut} from "../controllers/userController.js";
>>>>>>> eff4b7117d1397dbdb57a5a04be56db3bff708c1

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/checkToken", checkAuth)
<<<<<<< HEAD
router.get("/logout",userLogOut)
=======
router.post("/logOut", userLogOut)
>>>>>>> eff4b7117d1397dbdb57a5a04be56db3bff708c1

export default router;
