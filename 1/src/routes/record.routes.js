const { Router } = require("express");
const validators = require("../validators");
const controllers = require("../controllers");

const router = Router();

// Get all records from a weather station
router.get(
	"/",
	validators.record.getRecords(),
	validators.validateResult,
	controllers.record.getRecords,
);

// Add a new record to a weather station
router.post(
	"/",
	validators.record.addRecord(),
	validators.validateResult,
	controllers.record.addRecord,
);

module.exports = router;
