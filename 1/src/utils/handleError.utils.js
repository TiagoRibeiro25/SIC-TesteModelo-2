const http = require("./http.utils");
const handleResponse = require("./handleResponse.utils");

/**
 * Handles a internal server error.
 * @param {import("express").Response} response - The Express Response object.
 * @param {Error} error - The error object.
 * @param {string} fileAbsolutePath - The absolute path of the file where the error occurred.
 */
module.exports = (response, error, fileAbsolutePath) => {
	// Send the response with a 500 status code
	handleResponse(response, http.StatusInternalServerError, "Something went wrong!");

	// Get the file path (relative to the src folder)
	const filePath = fileAbsolutePath.split("/src/").at(-1);

	console.log(`[${filePath}] Error: ${error.name}`);
	console.log(`[${filePath}] Message: ${error.message}`);
};
