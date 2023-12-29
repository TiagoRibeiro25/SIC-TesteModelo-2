const { DataTypes } = require("sequelize");

/** @param {import("sequelize").Sequelize} sequelize */
const WeatherStationModel = (sequelize) => {
	return sequelize.define(
		"weather_station",
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: true,
				},
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			latitude: {
				type: DataTypes.DECIMAL(10, 8),
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
			longitude: {
				type: DataTypes.DECIMAL(11, 8),
				allowNull: false,
				validate: {
					notEmpty: true,
				},
			},
		},
		{
			sequelize,
			tableName: "weather_station_40210462",
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "id" }],
				},
				{
					name: "name",
					unique: true,
					using: "BTREE",
					fields: [{ name: "name" }],
				},
			],
		},
	);
};

module.exports = WeatherStationModel;
