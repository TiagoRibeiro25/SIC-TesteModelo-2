const Apollo = require("apollo-server-express");

module.exports = Apollo.gql`
    type Query {
		getStation(id: ID!): WeatherStation!
    }

    type RainfallRecord {
        id: ID!,
        value: Float!,
		dateTime: String!,
    }

    type WeatherStation {
        id: ID!,
        name: String!,
		description: String,
		latitude: Float!,
		longitude: Float!,
		records: [RainfallRecord!],
    }

    type Mutation {
		addStation(name: String!, description: String, latitude: Float!, longitude: Float!): WeatherStation!
	}
`;
