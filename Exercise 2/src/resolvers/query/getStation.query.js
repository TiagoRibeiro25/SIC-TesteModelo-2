const utils = require("../../utils");
const models = require("../../models");

module.exports = async (_parent, { id }) => {
	const station = await models.WeatherStation_GQL.findByPk(id, {
		include: [models.RainfallRecord_GQL],
	});

	if (!station) {
		throw new Error(utils.error.errorName.NOTFOUND);
	}

	return station;
};
