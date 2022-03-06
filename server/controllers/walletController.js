// TODO
getWallets = async (req, res) => {
	console.log("getWallets")
    const userId = req.userId
    
}

// TODO
addWallet = async (req, res) => {
	console.log("addWallet")
    const userId = req.userId
    const name = req.body.name
    const type = req.body.type
    const address = req.body.address
    
}

// TODO
removeWallet = async (req, res) => {
	console.log("removeWallet")
    const userId = req.userId
    const walletId = req.body.walletId
    
}

module.exports = {
	getWallets,
	addWallet,
	removeWallet,
}