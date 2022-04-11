<<<<<<< HEAD
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const OrderSchema = new Schema(
	{
		thirdPartyOrderId: {type: String, required: true},
		token: {type: String, required: true},
		productIds: {type: [ObjectId], required: true}
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Order', OrderSchema)
=======
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const OrderSchema = new Schema(
	{
		thirdPartyOrderId: {type: String, required: true},
		token: {type: String, required: true},
		productIds: {type: [ObjectId], required: true}
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Order', OrderSchema)
>>>>>>> 72561517232582b8daed721ea0f485361341c326
