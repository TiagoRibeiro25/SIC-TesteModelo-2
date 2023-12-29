const db = require("../../db");
const utils = require("../../utils");
const config = require("../../config");

/**
 * @typedef BodyData
 * @property {string} name - The name of the weather station.
 * @property {string?} description - The description of the weather station.
 * @property {number} latitude - The latitude of the weather station.
 * @property {number} longitude - The longitude of the weather station.
 */

/**
 * Add a new weather station.
 * @param {import("express").Request} req - The Express Request object.
 * @param {import("express").Response} res - The Express Response object.
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
	try {
		/** @type {BodyData} */
		const { name, description, latitude, longitude } = req.body;

		// Check if there's already a station with the same name
		const station = await db.mysql.WeatherStation.findOne({
			where: { name },
		});

		if (station) {
			utils.handleResponse(res, utils.http.StatusConflict, "Station already exists");
			return;
		}

		// Create the station
		const newStation = await db.mysql.WeatherStation.create({
			name,
			description,
			latitude,
			longitude,
		});

		utils.handleResponse(res, utils.http.StatusCreated, "Station created", {
			station: newStation,
		});
	} catch (error) {
		utils.handleError(res, error, __filename);
	}
};
