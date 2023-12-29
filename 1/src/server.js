if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

console.clear();

const express = require("express");
const cors = require("cors");

const app = express();

// Apply middlewares
app.use(cors());
app.use(express.json());

const db = require("./db");
const utils = require("./utils");
const routes = require("./routes");

app.use("/api/v1", routes);

// Not found handler
app.use((_req, res, _next) => {
	utils.handleResponse(res, utils.http.StatusNotFound, "Not found");
});

db.connect()
	.then(() => {
		const PORT = process.env.PORT;
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);

			// Start the MQTT service
			require("./services");
		});
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
		process.exit(1);
	});
