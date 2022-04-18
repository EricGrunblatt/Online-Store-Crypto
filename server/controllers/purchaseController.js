const constants = require('./constants.json')
const {Product, ProductState} = require('../models/productModel')
const User = require('../models/userModel')
const { coingateClient } = require('../handlers/purchaseHandler')
const { calculatePriceOfCart } = require('./helpers/purchaseControllerHelper')
const dotenv = require('dotenv')
const Cart = require('../models/cartModel')

dotenv.config()


addToCart = async (req, res) => {
	console.log("addToCart", req.body)
	const userId = req.userId
	const _id = req.body._id

	let json = {}
	let user = null
	let product = null
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
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
		else if (product.sellerUsername === user.username) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.userOwnsThisItem}
		}
		else {
			const cart = new Cart({buyerUsername: user.username, productId: _id})
			try {
				await cart.save()
				json = {status: constants.status.OK}
			} catch (err) {
				if (err.name === "MongoServerError" && err.code === 11000) {
					json = {status: constants.status.ERROR, errorMessage: constants.purchase.cartAlreadyIncludesProduct}
				}
				else {
					json = {status: constants.status.ERROR, errorMessage: "errorCode=" + err.code}
				}
			}
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
	let cartItem = null
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
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
		else if (! (cartItem = await Cart.findOneAndRemove({buyerUsername: user.username, productId: _id}))) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.cartItemDoesNotExist}
		}
		else {
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
	console.log("purchaseFromCart", req.body)
	const userId = req.userId
	
	let json = {}
	let user = null
	let cartItems = null
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
		}
		else if (! (user = await User.findById(userId))) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.userDoesNotExist}
		}
		else if (! (cartItems = await Cart.find({buyerUsername: user.username}))) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.cartIsEmpty}
		}
		else if (cartItems.length === 0) {
			json = {status: constants.status.ERROR, errorMessage: constants.purchase.cartIsEmpty}
		}
		else {

			// TODO: Mark shopping cart items as "reserved"

			const price_amount = await calculatePriceOfCart(user)

			// TODO: Check price is not over 25 BTC

			const price_currency = 'BTC'
			const receive_currency = 'BTC'

			const invoice = {
				price_amount: price_amount,
				price_currency: price_currency,
				receive_currency: receive_currency,
			}

			console.log("SENDING TO COINGATE: ", invoice)

			const order = await coingateClient.createOrder(invoice)
			json = order
			console.log("REDIRECT: ", json)
			res.redirect(order.payment_url)
		}
		// console.log("RESPONSE: ", json)
		// res.status(200).json(json)
	} catch (err) {
		console.log(err)
		// console.log(err.response.response.data)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

// TODO
purchaseCallback = async (req, res) => {
	console.log("purchaseCallback", req.body)
	
}

module.exports = {
	addToCart,
	removeFromCart,
	purchaseFromCart,
	purchaseCallback,
}