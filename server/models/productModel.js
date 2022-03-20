const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ProductSchema = new Schema(
	{
		name:			{type: String, required: true},
		description:	{type: String, required: true},
		condition:		{type: String, required: true},
		category:		{type: String, required: true},
		sellerUsername:	{type: ObjectId, required: true},
		buyerUsername:	{type: ObjectId, required: true},
		dateSold:		{type: Date, required: true},
		price:			{type: Number, required: true},
		shippingPrice:	{type: Number, required: true},
		reviewId:		{type: ObjectId, required: true},
		imageIds:		{type: [ObjectId], required: true},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Product', ProductSchema)
