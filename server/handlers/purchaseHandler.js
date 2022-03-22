const dotenv = require('dotenv')
const { client, testClient, Client, Config } = require('coingate-v2');

dotenv.config()

// COINGATE CLIENT
const coingateClient = testClient(process.env.COINGATE_AUTH);

module.exports = {
	coingateClient,
}