const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ProductState = {
	LISTED: "LISTED",
	DELETED: "DELETED",
	RESERVED: "RESERVED",
	SOLD: "SOLD",
}

const ProductSchema = new Schema(
	{
		name:				{type: String, required: true},
		description:		{type: String, required: true},
		condition:			{type: String, required: true},
		category:			{type: String, required: true},
		sellerUsername:		{type: String, required: true},
		buyerUsername:		{type: String, default: null},
		dateSold:			{type: Date, default: null},
		price:				{type: Number, required: true},
		shippingPrice:		{type: Number, required: true},
		boxLength:			{type: Number, required: true},
		boxWidth:			{type: Number, required: true},
		boxHeight:			{type: Number, required: true},
		boxWeight:			{type: Number, required: true},
		reviewId:			{type: ObjectId, default: null},
		imageIds:			{type: [ObjectId], required: true},
		state:				{type: String, default: ProductState.LISTED},
		reserverUsername:	{type: String, default: null}
	},
	{ timestamps: true },
)

module.exports = {
	Product: mongoose.model('Product', ProductSchema),
	ProductState: ProductState,
}
