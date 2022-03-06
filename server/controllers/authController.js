const User = require('../models/userModel')

// TODO
register = async (req, res) => {
	console.log("register")
	const firstName = req.body.firstName
	const lastName = req.body.lastName
	const email = req.body.email
	const username = req.body.username
	const password = req.body.password
	const addressFirstLine = req.body.password
	const addressSecondLine = req.body.password
	const phoneNumber = req.body.password
	const city = req.body.password
	const state = req.body.password
	const zipcode = req.body.password
	
}

// TODO
login = async (req, res) => {
	console.log("login")
	const emailOrUsername = req.body.emailOrUsername;
	const password = req.body.password;
	
}

// TODO
logout = async (req, res) => {
	console.log("logout")
	
}

module.exports = {
	register,
	login,
	logout,
}