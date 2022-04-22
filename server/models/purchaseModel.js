const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PurchaseState = {
	PENDING: "PENDING",
	SUCCESSFUL: "SUCCESSFUL",
	FAILED: "FAILED",
}

const PurchaseSchema = new Schema(
	{
		buyerUsername:		{type: String, required: true},
		thirdPartyOrderId:	{type: String, required: true},
		token:				{type: String, required: true},
		productIds:			{type: [ObjectId], required: true},
		state:				{type: String, default: PurchaseState.PENDING},
	},
	{ timestamps: true },
)

module.exports = {
	Purchase: mongoose.model('Purchase', PurchaseSchema),
	PurchaseState: PurchaseState,
}