const {Product, ProductState} = require("../../models/productModel")
const Cart = require("../../models/cartModel")
const { Order, OrderState } = require("../../models/orderModel")
const { Purchase, PurchaseState } = require("../../models/purchaseModel")

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

handlePurchaseCallbackPaidStatus = async (req) => {
    const {
        id, 
        order_id, 
        status, 
        pay_amount, 
        pay_currency, 
        price_currency, 
        receive_currency, 
        receive_amount,
        created_at,
        token,
        underpaid_amount,
        overpaid_amount,
        is_refundable,
    } = req.body
    try {
        if (! (purchase = await Purchase.findById(order_id))) {
			json = {status: constants.status.ERROR, errorMessage: "purchase entry doesn't exist"}
		}
		else if (purchase.token !== token) {
			json = {status: constants.status.ERROR, errorMessage: "purchase token incorrect"}
		}
		else {
			console.log("PURCHASE: ", purchase)
			for(const productId of purchase.productIds) {
				const order = await Order.findOneAndUpdate(
					{productId: productId}, 
					{state: OrderState.SUCCESSFUL}
				)
				console.log("ORDER: ", order)
				const product = await Product.findOneAndUpdate(
					{_id: productId}, 
					{state: ProductState.SOLD, buyerUsername: order.buyerUsername, dateSold: Date.now()}
				)
				console.log("PRODUCT: ", product)
			}

			purchase.state = PurchaseState.SUCCESSFUL
			await purchase.save()
		}
    } catch (error) {
        console.log(error)
    }
}

handlePurchaseCallbackCanceledStatus = async (req) => {
    const {
        id, 
        order_id, 
        status, 
        pay_amount, 
        pay_currency, 
        price_currency, 
        receive_currency, 
        receive_amount,
        created_at,
        token,
        underpaid_amount,
        overpaid_amount,
        is_refundable,
    } = req.body
    try {
        if (! (purchase = await Purchase.findById(order_id))) {
			json = {status: constants.status.ERROR, errorMessage: "purchase entry doesn't exist"}
		}
		else if (purchase.token !== token) {
			json = {status: constants.status.ERROR, errorMessage: "purchase token incorrect"}
		}
		else {
			console.log("PURCHASE: ", purchase)
			for(const productId of purchase.productIds) {
				const order = await Order.findOneAndRemove(
					{productId: productId}
				)
				console.log("ORDER: ", order)
				const product = await Product.findOneAndUpdate(
					{_id: productId}, 
					{state: ProductState.LISTED, buyerUsername: null, dateSold: null, reserverUsername: null}
				)
				console.log("PRODUCT: ", product)
                const cart = new Cart({buyerUsername: purchase.buyerUsername, productId: productId})
                cart.save()
			}

			purchase.state = PurchaseState.FAILED
			await purchase.save()
		}
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
	calculatePriceOfReserved,
	reserveCartProducts,
	unreserveProducts,
    handlePurchaseCallbackPaidStatus,
    handlePurchaseCallbackCanceledStatus,
}
