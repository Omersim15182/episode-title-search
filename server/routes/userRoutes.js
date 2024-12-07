const express = require("express");
const router = express.Router();

const serverUserController = require("../controllers/userController");

/*GET user controllers*/

/*POST user controllers*/
router.post("/Series/series-data", serverUserController.sendSeriesData);

module.exports = router;
