const {Product, ProductState} = require("../../models/productModel")
const Cart = require("../../models/cartModel")
const { Order, OrderState } = require("../../models/orderModel")

calculatePriceOfReserved = async (username) => {
	let price = 0;
	const reservations = await Order.find({ buyerUsername: username, state: OrderState.PENDING })
	const productIds = reservations.map(reservation => reservation.productId)
	for (const productId of productIds) {
		const product = await Product.findById(productId)
		price += product.price + product.shippingPrice
	}
	console.log("CALCULATED PRICE: ", price)
	return price
}

// TODO
reserveCartProducts = async (username) => {
	let reservedProductIds = []
	let failedToReserveIds = []
	const cartItems = await Cart.find({buyerUsername: username})
	const cartProductIds = cartItems.map((cartItem) => cartItem.productId)
	for (const productId of cartProductIds) {
		let order = null;
		try {
			if (await Order.findOne({productId: productId})) {
				failedToReserveIds.push(productId)
			}
			else {
				const reservation = new Order({buyerUsername: username, productId: productId})
				await reservation.save()
				reservedProductIds.push(productId)
				await Cart.findOneAndRemove({buyerUsername: username, productId: productId})
				await Product.findOneAndUpdate({_id: productId}, {
					state: ProductState.RESERVED, 
					reserverUsername: username,
				})
			}
		} catch (err) {
			failedToReserveIds.push(productId)
		}
	}
	return {reservedProductIds, failedToReserveIds}
}

unreserveProducts = async (username, reservedProductIds) => {
	await Promise.all(reservedProductIds.map(async (productId) => {
		try {
			await Order.findOneAndRemove({buyerUsername: username, productId: productId})
			const cartItem = new Cart({
				buyerUsername: username,
				productId: productId,
			})
			await cartItem.save()
			await Product.findOneAndUpdate({_id: productId}, {
				state: ProductState.LISTED, 
				reserverUsername: null,
			})
		} catch (err) {
			console.log(`FAILED TO UNRESERVE PRODUCTID ${productId} FOR USERNAME ${username}`)
		}
	}))
}

module.exports = {
	calculatePriceOfReserved,
	reserveCartProducts,
	unreserveProducts,
}