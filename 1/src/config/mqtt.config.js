module.exports = {
	HIVEMQ_CLOUD_URL: process.env.HIVEMQ_CLOUD_URL,
	HIVEMQ_CLOUD_USER: process.env.HIVEMQ_CLOUD_USER,
	HIVEMQ_CLOUD_PASSWORD: process.env.HIVEMQ_CLOUD_PASSWORD,
	protocol: "mqtts",
	port: 8883,
	secure: true, // Ensures the client requires TLS
};
