const constants = require('./constants.json')
const Product = require('../models/productModel')
const User = require('../models/userModel')

//TODO
addToCart = async (req, res) => {
	console.log("addToCart", req.body)
	const userId = req.userId
	const _id = req.body._id

	let json = {}
	let user = null
	try {
		if (!userId) {
			throw "did not get a userId"
		}
		else if (!_id) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.missingRequiredField}
		}
		else if (! (user = await User.findById(userId))) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.userDoesNotExist}
		}
		else if (! (await Product.findById(_id))) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.productDoesNotExist}
		}
		else if (user.cartProductIds.includes(_id)) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.cartAlreadyIncludesProduct}
		}
		else {
			user.cartProductIds.push(_id)
			user.save()
			json = {status: constants.status.OK}
		}
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

// TODO
removeFromCart = async (req, res) => {
	console.log("removeFromCart", req.body)
	const userId = req.userId
	const _id = req.body._id

	let json = {}
	let user = null
	try {
		if (!userId) {
			throw "did not get a userId"
		}
		else if (!_id) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.missingRequiredField}
		}
		else if (! (user = await User.findById(userId))) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.userDoesNotExist}
		}
		else if (! (await Product.findById(_id))) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.productDoesNotExist}
		}
		else if (! user.cartProductIds.includes(_id)) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.cartDoesNotIncludeProduct}
		}
		else {
			const indexOfProductId = user.cartProductIds.indexOf(_id)
			user.cartProductIds.splice(indexOfProductId, 1)
			user.save()
			json = {status: constants.status.OK}
		}
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

//TODO
purchaseFromCart = async (req, res) => {
	console.log("purchase")

}

module.exports = {
	addToCart,
	removeFromCart,
	purchaseFromCart,
}