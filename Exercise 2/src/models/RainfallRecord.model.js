const { DataTypes } = require("sequelize");
const WeatherStationModel = require("./WeatherStation.model");

/** @param {import("sequelize").Sequelize} sequelize */
const RainfallRecordModel = (sequelize) => {
	return sequelize.define(
		"rainfall_record",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			weather_station_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: WeatherStationModel(sequelize),
					key: "id",
				},
			},
			value: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			date_time: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			tableName: "rainfall_record_40210462",
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "weather_station_id",
					using: "BTREE",
					fields: [{ name: "weather_station_id" }],
				},
			],
		},
	);
};

module.exports = RainfallRecordModel;
