const User = require('../models/userModel')
const constants = require('./constants.json')
const bcryptjs = require('bcryptjs')
const auth = require('../auth')

register = async (req, res) => {
	console.log("register", req.body);

	// REQUEST BODY DATA
	const {firstName, lastName, username, email, password, phoneNumber} = req.body;
	const {addressFirstLine, addressSecondLine, city, state, zipcode} = req.body;

	// PROCESSING
	let json = {}
	try {
		// CHECK FOR MISSING FIELD
		if (!firstName || !lastName || !username || !email || !password || !phoneNumber) {
			json = { status: constants.status.ERROR, errorMessage: constants.auth.missingRequiredField }
		}
		else if (!addressFirstLine || !city || !state || !zipcode) {
			// NOTE: addressSecondLine not included, since it can be empty string
			json = { status: constants.status.ERROR, errorMessage: constants.auth.missingRequiredField }
		}
		// CHECK PASSWORD LENGTH
		else if (password.length < 8) {
			json = { status: constants.status.ERROR, errorMessage: constants.auth.passwordTooShort }
		}
		// CHECK EMAIL AND USERNAME CONTENTS
		else if (!email.includes("@")) {
			json = { status: constants.status.ERROR, errorMessage: constants.auth.invalidEmail}
		}
		else if (username.includes("@")) {
			json = { status: constants.status.ERROR, errorMessage: constants.auth.invalidUsername}
		}
		// CHECK IF USER WITH IDENTIFIER ALREADY EXISTS
		else if (await User.findOne({ email: email })) {
			json = { status: constants.status.ERROR, errorMessage: constants.auth.emailAlreadyExists }
		}
		else if (await User.findOne({ username: username })) {
			json = { status: constants.status.ERROR, errorMessage: constants.auth.userAlreadyExists }
		}
		else {
			// HASH PASSWORD
			const saltRounds = 10
			const salt = await bcryptjs.genSalt(saltRounds)
			const passwordHash = await bcryptjs.hash(password, salt)

			// CREATE USER
			const user = new User({
				firstName: firstName,
				lastName: lastName,
				username: username,
				email: email,
				passwordHash: passwordHash,
				phoneNumber: phoneNumber,
				addressFirstLine: addressFirstLine,
				addressSecondLine: addressSecondLine,
				city: city,
				state: state,
				zipcode: zipcode
			})

			// SAVE USER
			await user.save()

			json = { 
				status: constants.status.OK, 
				user: {
					firstName: user.firstName,
					lastName: user.lastName,
					username: user.username,
					email: user.email
				} 
			}

			// LOGIN USER
			const token = auth.signToken(user)
			auth.setCookie(res, token)
		}
		console.log("RESPONSE: ", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

login = async (req, res) => {
	console.log("login", req.body)

	// REQUEST BODY DATA
	const {emailOrUsername, password} = req.body

	// PROCESSING
	let json = {}
	try {
		// CHECK FOR MISSING FIELD
		if (!emailOrUsername || !password) {
			json = {status: constants.status.ERROR, errorMessage: constants.auth.missingRequiredField}
		}
		else {
			const user = await User.findOne({$or: [{email: emailOrUsername}, {username: emailOrUsername}]})
			
			// CHECK IF USER EXISTS
			if (!user) {
				json = {status: constants.status.ERROR, errorMessage: constants.auth.userDoesNotExist}
			}
			// CHECK IF PASSWORD IS CORRECT
			else if (!(await bcryptjs.compare(password, user.passwordHash))) {
				json = {status: constants.status.ERROR, errorMessage: constants.auth.passwordsDoNotMatch}
			}
			else {
				json = {
					status: constants.status.OK,
					user: {
						firstName: user.firstName,
						lastName: user.lastName,
						username: user.username,
						email: user.email
					}
				}

				// SET COOKIE
				const token = auth.signToken(user)
				auth.setCookie(res, token)
			}
		}
		console.log("RESPONSE: ", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR);
	}
}

logout = async (req, res) => {
	console.log("logout")

	// SET COOKIE TO EXPIRE
	auth.setCookie(res, "", {expires: new Date(0)})
	res.send({status: constants.status.OK});
}

getLoggedIn = async (req, res) => {
	console.log("getLoggedIn")
	const userId = req.userId

	const userSelect = {"_id": 0, "firstName": 1, "lastName": 1, "username": 1, "email": 1}

	let json = {}
	let user = null
	try {
		if (! userId) {
			throw constants.error.didNotGetUserId
		}
		else if (! (user = await User.findById(userId).select(userSelect))) {
			json = {status: constants.status.ERROR, errorMessage: constants.auth.userDoesNotExist}
		}
		else {
			json = {status: constants.status.OK, user: user, loggedIn: true}
		}
		console.log("RESPONSE: ", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send({status: constants.status.FATAL_ERROR})
	}
}

module.exports = {
	register,
	login,
	logout,
	getLoggedIn,
}