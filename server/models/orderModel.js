const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const OrderSchema = new Schema(
	{
		thirdPartyOrderId: {type: String, required: true},
		productId: {type: ObjectId, required: true}
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Order', OrderSchema)