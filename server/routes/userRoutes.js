import express from "express";

const router = express.Router();

import getTitle from "../controllers/seriesController.js";
import { loginUser } from "../controllers/userController.js";
import { registerUser } from "../controllers/userController.js";

/*GET user controllers*/
router.get("/user/Login", loginUser);

/*POST user controllers*/
router.post("/Series/series-data", getTitle);

router.post("/user/register", registerUser);

export default router;
