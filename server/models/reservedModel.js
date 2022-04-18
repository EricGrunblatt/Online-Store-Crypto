const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ProductReservationSchema = new Schema(
	{
		buyerUsername:		{type: String, required: true},
		productId:			{type: String, required: true},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('ProductReservation', ProductReservationSchema)
