const { body } = require("express-validator");

/**
 * Returns an array of validation rules.
 * @returns {Array} An array of validation rules.
 */
module.exports = () => {
	return [
		body("stationId").notEmpty().isInt({ min: 1 }).withMessage("Invalid stationId"),

		body("value").notEmpty().isInt().withMessage("Invalid value"),
	];
};
