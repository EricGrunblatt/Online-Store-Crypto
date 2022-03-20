const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()

verify = function (req, res, next) {
	try {
		const token = req.cookies.token;
		if (!token) {
			return res.status(200).json({
				status: "ERROR",
				errorMessage: "Unauthorized"
			})
		}
		const tokenData = jwt.verify(token, process.env.JWT_SECRET)
		req.userId = tokenData.userId;
		next();
	} catch (err) {
		console.error(err);
		return res.status(200).json({
			status: "ERROR",
			errorMessage: "Unauthorized"
		});
	}
}

signToken = function (user) {
	return jwt.sign({
		userId: user._id
	}, process.env.JWT_SECRET);
}

setCookie = function (res, token, options) {
	let cookieOptions = {
		httpOnly: true,
		secure: process.env.ENVIRONMENT === "production",
		sameSite: "none"
	}
	if (options) {
		cookieOptions = {...cookieOptions, ...options}
	}
	res.cookie("token", token, cookieOptions)
}

module.exports = {
    verify,
	signToken,
	setCookie,
}