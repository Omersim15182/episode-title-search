import express from "express";
const router = express.Router();

import {
  getTitle,
  seriesSearchCounts,
  recentSearches,
} from "../series/seriesController.js";
import {
  loginUser,
  registerUser,
  logoutUser,
  verifyUser,
} from "../users/userController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { actorId } from "../actors/actorController.js";
/*GET user controllers*/

/*POST user controllers*/
router.post("/Series/series-data", checkAuth, getTitle);
router.post("/Series/series-data/recent-searches", checkAuth, recentSearches);
router.post("/Series/series-data/actorId", checkAuth, actorId);
router.post("/Series/series-data/seriesChart", checkAuth, seriesSearchCounts);

router.post("/user/auth/Login", loginUser);
router.post("/user/auth/register", registerUser);
router.post("/user/auth/Logout", logoutUser);
router.post("/user/auth/verify", checkAuth, verifyUser);

export default router;
