const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ProductSchema = new Schema(
	{
		name:			{type: String, required: true},
		description:	{type: String, required: true},
		condition:		{type: String, required: true},
		category:		{type: String, required: true},
		sellerUsername:	{type: String, required: true},
		buyerUsername:	{type: String, default: null},
		dateSold:		{type: Date, default: null},
		price:			{type: Number, required: true},
		shippingPrice:	{type: Number, required: true},
		reviewId:		{type: ObjectId, default: null},
		imageIds:		{type: [ObjectId], required: true},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Product', ProductSchema)
