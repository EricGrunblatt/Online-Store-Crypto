//TODO
addToCart = async (req, res) => {
	console.log("addToCart")
	const userId = req.userId
	const id = req.body.id
	
}

//TODO
purchaseFromCart = async (req, res) => {
	console.log("purchase")

}

module.exports = {
	addToCart,
	purchaseFromCart,
}