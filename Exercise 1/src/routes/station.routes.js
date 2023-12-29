const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");

const router = Router();

// Add a new weather station
router.post(
	"/",
	validators.station.addStation(),
	validators.validateResult,
	controllers.station.addStation,
);

module.exports = router;
