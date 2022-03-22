const constants = require('./constants.json')
const Product = require('../models/productModel')
const User = require('../models/userModel')
const { coingateClient } = require('../handlers/purchaseHandler')

addToCart = async (req, res) => {
	console.log("addToCart", req.body)
	const userId = req.userId
	const _id = req.body._id

	let json = {}
	let user = null
	let product = null
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
		else if (! (product = await Product.findById(_id))) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.productDoesNotExist}
		}
		else if (user.cartProductIds.includes(_id)) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.cartAlreadyIncludesProduct}
		}
		else if (product.sellerUsername === user.username) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.userOwnsThisItem}
		}
		else {
			user.cartProductIds.push(_id)
			user.save()
			json = {status: constants.status.OK}
		}
		console.log("RESPONSE: ", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

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
		console.log("RESPONSE: ", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

//TODO
purchaseFromCart = async (req, res) => {
	console.log("purchase", req.body)
	const userId = req.userId
	
	let json = {}
	let user = null
	try {
		if (!userId) {
			throw "did not get a userId"
		}
		else if (! (user = await User.findById(userId))) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.userDoesNotExist}
		}
		else if (user.cartProductIds.length === 0) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.cartIsEmpty}
		}
		else {
			const price_amount = 1
			const price_currency = 'BTC'
			const receive_currency = 'BTC'

			const order = await coingateClient.createOrder({
				price_amount: price_amount,
				price_currency: price_currency,
				receive_currency: receive_currency,
			})
			json = order
			res.redirect(order.payment_url)
		}
		console.log("RESPONSE: ", json)
		// res.status(200).json(json)
	} catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

module.exports = {
	addToCart,
	removeFromCart,
	purchaseFromCart,
}