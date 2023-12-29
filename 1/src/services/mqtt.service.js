const mqtt = require("mqtt");
const config = require("../config");
const db = require("../db");

const client = mqtt.connect(config.mqtt.HIVEMQ_CLOUD_URL, {
	username: config.mqtt.HIVEMQ_CLOUD_USER,
	password: config.mqtt.HIVEMQ_CLOUD_PASSWORD,
	protocol: config.mqtt.protocol,
	port: config.mqtt.port,
	secure: config.mqtt.secure,
});

// Handle errors
client.on("error", (err) => {
	console.error("An error occurred while connecting to MQTT broker", err);
	process.exit(1);
});

// TODO (refactor): Move the event handlers to a separate file each

// Connect to MQTT topic to receive messages
client.on("connect", () => {
	client.subscribe("/records", (err) => {
		if (err) {
			console.error(
				"An error occurred while connecting to MQTT topic to receive messages",
				err,
			);
		} else {
			console.log("Connected to MQTT topic to receive messages");
		}
	});
});

// Handle messages received
client.on("message", async (topic, message) => {
	try {
		if (topic !== "/records") {
			return;
		}

		const messageReceived = JSON.parse(message.toString());
		const stationId = +messageReceived.stationId;
		const value = +messageReceived.value;

		// Check if the station exists
		const station = await db.mysql.WeatherStation.findByPk(stationId);

		if (!station) {
			console.log(`Station with id ${stationId} not found`);
			return;
		}

		await db.mysql.RainfallRecord.create({ weather_station_id: stationId, value });

		console.log(`Received new value: Station ${stationId}, Value ${value}`);
	} catch (error) {
		console.error("An error occurred while handling the message received", err);
	}
});

module.exports = client;
