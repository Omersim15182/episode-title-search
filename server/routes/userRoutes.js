import express from "express";
const router = express.Router();

import {
  getTitle,
  seriesSearchCounts,
  recentSearches,
  streamingInfo,
} from "../series/seriesController.js";
import {
  userLogin,
  registerUser,
  userLogout,
  userVerify,
  UserInfo,
  registerVerify,
} from "../users/userController.js";
import { contacts, messages, fetchMessages } from "../chat/chatController.js";
import { checkAuth } from "../middleware/checkAuth.js";
import { actorId } from "../actors/actorController.js";
import { fetchDataFromAi,fetchRecommendedSeries } from "../groqAi/groqController.js";

/*POST user controllers*/
router.post("/Series/series-data", checkAuth, getTitle);
router.get("/Series/series-data/seriesChart", checkAuth, seriesSearchCounts);
router.get("/Series/series-data/actorId", checkAuth, actorId);
router.get("/Series/series-data/recent-searches", checkAuth, recentSearches);
router.get("/Series/series-data/streaming", checkAuth, streamingInfo);

router.post("/chat/messages/save", checkAuth, messages);
router.get("/chat/contacts/get", checkAuth, contacts);
router.get("/chat/messages/get", checkAuth, fetchMessages);

router.post("/user/auth/Login", userLogin);
router.post("/user/auth/register", registerUser);
router.post("/user/auth/verifyemail", registerVerify);
router.post("/user/auth/Logout", checkAuth, userLogout);
router.post("/user/auth/verify", checkAuth, userVerify);
router.get("/user/auth/info", checkAuth, UserInfo);

router.get("/Ai/getData", checkAuth, fetchDataFromAi);
router.get("/Ai/getRecommendedSeries", checkAuth, fetchRecommendedSeries);

export default router;
