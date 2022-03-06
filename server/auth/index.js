const jwt = require("jsonwebtoken")

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

module.exports = {
    verify,
	signToken,
}