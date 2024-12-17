import express from "express";

const router = express.Router();

import sendSeriesData from "../controllers/userController.js";
/*GET user controllers*/

/*POST user controllers*/
router.post("/Series/series-data", sendSeriesData);

export default router;
