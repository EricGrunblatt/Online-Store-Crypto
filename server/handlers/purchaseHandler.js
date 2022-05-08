const dotenv = require('dotenv')
const { client, testClient, Client, Config } = require('coingate-v2');
const { Purchase, PurchaseState } = require('../models/purchaseModel')

dotenv.config()

// COINGATE CLIENT
const coingateClient = testClient(process.env.COINGATE_AUTH);

createPurchase = async (user, price_amount, price_currency, receive_currency) => {
	let purchase = null
	try {
		purchase = new Purchase({
			buyerUsername: user.username,
			productIds: reservedProductIds,
			price: price_amount,
		})
		const invoice = await coingateClient.createOrder({
			order_id: purchase._id,
			price_amount: price_amount,
			price_currency: price_currency,
			receive_currency: receive_currency,
			title: `Cryptorium OrderId#${purchase._id}`,
			description: "TEMP DESCRIPTION",
			callback_url: "https://cryptorium.requestcatcher.com/",
			cancel_url: "https://www.yahoo.com",
			success_url: "https://www.google.com",
			purchaser_email: user.email,
		})
		
		console.log("INVOICE: ", invoice)
		
		const {
			payment_url,
			token,
		} = invoice
		
		purchase.thirdPartyOrderId = invoice.id
		purchase.token = token
		purchase.invoice = payment_url
		purchase.save()
	} catch (err) {
		console.log(err)
		console.log(err.response.response.data)
		purchase = null
	}
	return purchase
}

module.exports = {
	coingateClient,
	createPurchase,
}