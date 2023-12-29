const models = require("../models");
const query = require("./query");
const mutation = require("./mutation");

module.exports = {
	Query: {
		getStation: query.getStation,
	},

	Mutation: {
		addStation: mutation.addStation,
	},

	WeatherStation: {
		records: (parent) => {
			return models.RainfallRecord_GQL.findAll({
				where: {
					station_id: parent.id,
				},
			});
		},
	},

	RainfallRecord: {
		dateTime: (parent) => {
			return parent.date_time;
		},
	},
};
