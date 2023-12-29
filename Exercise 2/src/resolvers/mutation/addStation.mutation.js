const models = require("../../models");

module.exports = (_parent, { name, description, latitude, longitude }, { req }) => {
	return models.WeatherStation_GQL.create({
		name,
		description,
		latitude,
		longitude,
	});
};
