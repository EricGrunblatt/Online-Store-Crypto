const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
	{
		firstName:			{type: String, required: true},
		lastName:			{type: String, required: true},
		username:			{type: String, required: true},
		email:				{type: String, required: true},
		passwordHash: 		{type: String, required: true},
		addressFirstLine: 	{type: String, required: true},
		addressSecondLine: 	{type: String, required: true},
		phoneNumber: 		{type: String, required: true},
		city: 				{type: String, required: true},
		state: 				{type: String, required: true},
		zipcode: 			{type: Number, required: true},
		profileImageId: 	{type: ObjectId, default: null},
		wallets: 			{type: [{
								name: {type: String, required: true},
								type: {type: String, required: true},
								address: {type: String, required: true},
							}], default: []},
		sellingProductIds:	{type: [ObjectId], default: []},
		soldProductIds:		{type: [ObjectId], default: []},
		orderedProductIds:	{type: [ObjectId], default: []},
		cartProductIds:		{type: [ObjectId], default: []},
	},
	{ timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
