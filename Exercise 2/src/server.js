if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const cors = require("cors");
const express = require("express");
const Apollo = require("apollo-server-express");

const app = express();
app.use(cors);

const schema = require("./schema");
const resolvers = require("./resolvers");
const utils = require("./utils");

const server = new Apollo.ApolloServer({
	typeDefs: schema,
	resolvers,
	context: ({ req }) => {
		return { req };
	},
	formatError: (err) => {
		return utils.error.getErrorCode(err.message);
	},
});

server.start().then(() => {
	server.applyMiddleware({ app, path: "/graphql" });

	const PORT = process.env.PORT;
	app.listen(PORT, () => {
		console.log("Apollo Server is running on localhost:" + PORT + "/graphql");
	});
});
