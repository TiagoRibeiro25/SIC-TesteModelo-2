const mysql = require("./mysql");

module.exports = {
	// The models and the sequelize instance
	mysql,

	/**
	 * Connects to the databases.
	 * @returns {Promise<void>} Whether the connection was successful.
	 */
	connect: async () => {
		await Promise.all([mysql.sequelize.authenticate()]);
	},
};
