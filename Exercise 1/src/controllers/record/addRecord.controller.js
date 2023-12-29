const utils = require("../../utils");
const services = require("../../services");

/**
 * @typedef BodyData
 * @property {number} stationId- The ID of the weather station.
 * @property {number} value - The value of the record.
 */

/**
 * Add a new record to a weather station.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
	try {
		/** @type { BodyData } */
		const { stationId, value } = req.body;

		services.mqtt.publish("/records", JSON.stringify({ stationId, value }));

		utils.handleResponse(res, utils.http.StatusOK, "Success");
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
};
