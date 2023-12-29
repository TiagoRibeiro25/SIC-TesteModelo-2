const db = require("../../db");
const utils = require("../../utils");
const config = require("../../config");

/**
 * Get all the records from a weather station.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
	try {
		const stationId = +req.query.stationId;
		const page = +req.query.page || config.pagination.records.defaultPage;
		const limit = +req.query.limit || config.pagination.records.defaultLimit;

		const records = await db.mysql.RainfallRecord.findAndCountAll({
			where: {
				weather_station_id: stationId,
			},
			order: [["createdAt", "DESC"]],
			offset: (page - 1) * limit,
			limit,
			attributes: {
				exclude: ["weather_station_id"],
			},
		});

		if (!records || records.rows.length === 0) {
			utils.handleResponse(res, utils.http.StatusNotFound, "No records found");
			return;
		}

		utils.handleResponse(res, utils.http.StatusOK, "Records found", {
			records: records.rows,
			total: records.count,
			page,
			limit,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
};
