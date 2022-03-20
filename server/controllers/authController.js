const User = require('../models/userModel')
const constants = require('./constants.json')
const bcryptjs = require('bcryptjs')
const auth = require('../auth')

register = async (req, res) => {
	console.log("register", req.body);

	// GET REQUEST BODY DATA
	const {firstName, lastName, username, email, password, phoneNumber} = req.body;
	const {addressFirstLine, addressSecondLine, city, state, zipcode} = req.body;

	// PROCESS DATA
	let json = {}
	try {
		// CHECK FOR MISSING FIELD
		if (!firstName || !lastName || !username || !email || !password || !phoneNumber) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField }
		}
		else if (!addressFirstLine || !city || !state || !zipcode) {
			// NOTE: addressSecondLine not included, since it can be empty string
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField }
		}
		// CHECK PASSWORD LENGTH
		else if (password.length < 8) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.passwordTooShort }
		}
		// CHECK EMAIL AND USERNAME CONTENTS
		else if (!email.includes("@")) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.invalidEmail}
		}
		else if (username.includes("@")) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.invalidUsername}
		}
		// CHECK IF USER WITH IDENTIFIER ALREADY EXISTS
		else if (await User.findOne({ email: email })) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.emailAlreadyExists }
		}
		else if (await User.findOne({ username: username })) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.userAlreadyExists }
		}
		// REGISTER USER
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

			// OK JSON
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
		console.log("response:", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

login = async (req, res) => {
	console.log("login", req.body)

	// GET REQUEST BODY DATA
	const {emailOrUsername, password} = req.body

	// PROCESS DATA
	let json = {}
	try {
		// CHECK FOR MISSING FIELD
		if (!emailOrUsername || !password) {
			json = {status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField}
		}
		else {
			const user = await User.findOne({$or: [{email: emailOrUsername}, {username: emailOrUsername}]})
			
			// CHECK IF USER EXISTS
			if (!user) {
				json = {status: constants.status.ERROR, errorMessage: constants.user.userDoesNotExist}
			}
			// CHECK IF PASSWORD IS CORRECT
			else if (!(await bcryptjs.compare(password, user.passwordHash))) {
				json = {status: constants.status.ERROR, errorMessage: constants.user.passwordsDoNotMatch}
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
		console.log("response:", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR);
	}
}

logout = async (req, res) => {
	console.log("logout")
	res.cookie("token", "", {
		httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(0)
	}).send({status: constants.status.OK});
}

module.exports = {
	register,
	login,
	logout,
}