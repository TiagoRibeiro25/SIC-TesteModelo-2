const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
	config.db.mysql.database,
	config.db.mysql.username,
	config.db.mysql.password,
	{
		host: config.db.mysql.host,
		dialect: config.db.mysql.dialect,
	},
);

const RainfallRecord_GQL = require("./RainfallRecord.model")(sequelize);
const WeatherStation_GQL = require("./WeatherStation.model")(sequelize);

//* Associations
WeatherStation_GQL.hasMany(RainfallRecord_GQL, {
	foreignKey: "weather_station_id",
	onDelete: "CASCADE",
});

RainfallRecord_GQL.belongsTo(WeatherStation_GQL, {
	foreignKey: "weather_station_id",
});

// Alter
sequelize.sync({
	alter: true,
	// force: true,
});

module.exports = { RainfallRecord_GQL, WeatherStation_GQL };
