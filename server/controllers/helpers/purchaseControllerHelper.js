const Product = require("../../models/productModel")

calculatePriceOfCart = async (user) => {
	let price = 0;
	for (const productId of user.cartProductIds) {
		const product = await Product.findById(productId)
		price += product.price + product.shippingPrice
	}
	console.log(price)
	return price
}

module.exports = {calculatePriceOfCart}