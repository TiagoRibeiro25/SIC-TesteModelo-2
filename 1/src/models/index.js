/**
 * Initialize the models and their associations
 * @param {import("sequelize").Sequelize} sequelize
 */
function init(sequelize) {
	const RainfallRecord = require("./RainfallRecord.model")(sequelize);
	const WeatherStation = require("./WeatherStation.model")(sequelize);

	//* Associations
	WeatherStation.hasMany(RainfallRecord, {
		foreignKey: "weather_station_id",
		onDelete: "CASCADE",
	});

	return { RainfallRecord, WeatherStation };
}

module.exports = { init };
