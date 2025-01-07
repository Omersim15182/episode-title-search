import express from "express";
const router = express.Router();

import { getTitle } from "../series/seriesController.js";
import { loginUser } from "../users/userController.js";
import { registerUser } from "../users/userController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { verifyUser } from "../users/userController.js";
import { recentSearches } from "../series/seriesController.js";
/*GET user controllers*/

/*POST user controllers*/
router.post("/Series/series-data", checkAuth, getTitle);
router.post("/Series/series-data/recent-searches", checkAuth, recentSearches);

router.post("/user/auth/Login", loginUser);
router.post("/user/auth/register", registerUser);
router.post("/user/auth/verify", checkAuth, verifyUser);

export default router;
