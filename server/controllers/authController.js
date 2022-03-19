const User = require('../models/userModel')
const constants = require('./constants.json')
const bcryptjs = require('bcryptjs')
const auth = require('../auth')

// TODO
register = async (req, res) => {
	console.log("register", req.body);

	// GET REQUEST BODY DATA
	const { firstName, lastName, username, email, password, phoneNumber } = req.body;
	const { addressFirstLine, addressSecondLine, city, state, zipcode } = req.body;

	// GET JSON
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

			const token = auth.signToken(user);
			res.cookie("token", token, {
				httpOnly: true,
				secure: true,
				sameSite: "none"
			})
		}
		console.log("response:", json)
		res.status(200).json(json);
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR);
	}
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