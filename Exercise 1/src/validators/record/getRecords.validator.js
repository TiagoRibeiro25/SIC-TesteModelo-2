const { query } = require("express-validator");
const config = require("../../config");

/**
 * Returns an array of validation rules.
 * @returns {Array} An array of validation rules.
 */
module.exports = () => {
	return [
		query("stationId").isInt({ min: 1 }).notEmpty().withMessage("Invalid station id"),

		query("page").optional().isInt({ min: 1 }).notEmpty().withMessage("Invalid page"),

		query("limit")
			.optional()
			.isInt({
				min: 1,
				max: config.pagination.records.maxLimit,
			})
			.notEmpty()
			.withMessage("Invalid limit"),
	];
};
