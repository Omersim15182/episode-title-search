import express from "express";
const router = express.Router();

import getTitle from "../controllers/seriesController.js";
import { loginUser } from "../controllers/userController.js";
import { registerUser } from "../controllers/userController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { verifyUser } from "../controllers/userController.js";

/*GET user controllers*/

/*POST user controllers*/
router.post("/Series/series-data", checkAuth, getTitle);

router.post("/user/auth/Login", loginUser);
router.post("/user/auth/register", registerUser);
router.post("/user/auth/verify",checkAuth ,verifyUser);

export default router;
