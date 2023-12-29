const { body } = require("express-validator");

/**
 * Returns an array of validation rules.
 * @returns {Array} An array of validation rules.
 */
module.exports = () => {
	return [
		body("name")
			.isString()
			.trim()
			.notEmpty()
			.isLength({ min: 3, max: 255 })
			.withMessage("Invalid name"),

		body("description")
			.optional()
			.isString()
			.trim()
			.isLength({ min: 3, max: 255 })
			.withMessage("Invalid description"),

		body("latitude").isNumeric().notEmpty().withMessage("Invalid latitude"),

		body("longitude").isNumeric().notEmpty().withMessage("Invalid longitude"),
	];
};
