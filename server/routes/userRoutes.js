import express from "express";
const router = express.Router();

import {
  getTitle,
  seriesSearchCounts,
  recentSearches,
} from "../series/seriesController.js";
import {
  userLogin,
  registerUser,
  userLogout,
  userVerify,
  UserInfo,
} from "../users/userController.js";
import { contacts } from "../chat/chatController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { actorId } from "../actors/actorController.js";

/*POST user controllers*/
router.post("/Series/series-data", checkAuth, getTitle);
router.post("/Series/series-data/recent-searches", checkAuth, recentSearches);
router.post("/Series/series-data/actorId", checkAuth, actorId);
router.post("/Series/series-data/seriesChart", checkAuth, seriesSearchCounts);

router.post("/chat/contacts", checkAuth, contacts);

router.post("/user/auth/Login", userLogin);
router.post("/user/auth/register", registerUser);
router.post("/user/auth/Logout", checkAuth, userLogout);
router.post("/user/auth/verify", checkAuth, userVerify);
router.post("/user/auth/info", checkAuth, UserInfo);

export default router;
