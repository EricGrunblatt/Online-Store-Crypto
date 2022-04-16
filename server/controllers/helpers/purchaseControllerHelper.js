const {Product, ProductState} = require("../../models/productModel")

calculatePriceOfCart = async (user) => {
	let price = 0;
	for (const productId of user.cartProductIds) {
		const product = await Product.findById(productId)
		price += product.price + product.shippingPrice
	}
	console.log("CALCULATED PRICE: ", price)
	return price
}

// TODO
reserveCartProducts = async (user) => {
	for (const productId of user.cartProductIds) {
		let product = await Product.findById(productId)
		if (product.state !== ProductState.RESERVED) {
			product.state = ProductState.RESERVED
			product.reserverUsername = user.username
			product.save()
		}
	}
}

module.exports = {
	calculatePriceOfCart,
	reserveCartProducts
}