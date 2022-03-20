
// TODO
getProfileByUsername = async (req, res) => {
	console.log("getProfile")
	const username = req.params.username

}

// TODO
getAccount = async (req, res) => {
	console.log("getAccount")
	const userId = req.userId

}

// TODO
updateAccount = async (req, res) => {
	console.log("updateAccount")
	const userId = req.userId

}

// TODO
updateProfileImage = async (req, res) => {
	console.log("updateProfileImage")
	// const image = 
}

// TODO
writeReview = async (req, res) => {
	console.log("writeReview")
	const userId = req.userId
	const objectId = req.body.objectId
	const stars = req.body.stars
	const comment = req.body.comment
	
}

module.exports = {
	getProfileByUsername,
	getAccount,
	updateAccount,
	updateProfileImage,
	writeReview,
}