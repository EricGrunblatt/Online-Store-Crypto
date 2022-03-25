//TODO
getWallets = async (req, res) => {
	console.log("getWallets", req.body)
	const userId = req.userId
	
}

//TODO
addWallet = async (req, res) => {
	console.log("addWallet", req.body)
	const userId = req.userId
}

//TODO
removeWallet = async (req, res) => {
	console.log("removeWallet", req.body)
	const userId = req.userId
}

module.exports = {
	getWallets,
	addWallet,
	removeWallet
}