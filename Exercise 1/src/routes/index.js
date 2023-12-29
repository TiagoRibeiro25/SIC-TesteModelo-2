const { Router } = require("express");
const utils = require("../utils");
const recordRoutes = require("./record.routes");
const stationRoutes = require("./station.routes");

const router = Router();

router.use("/record", recordRoutes);
router.use("/station", stationRoutes);

// Default Route
router.route("/").get((_req, res) => {
	utils.handleResponse(res, utils.http.StatusOK, "Teste Modelo 2 - Exercício 1");
});

module.exports = router;
