const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CartSchema = new Schema(
	{
		buyerUsername:		{type: String, required: true},
		productId:			{type: ObjectId, required: true},
	},
	{ timestamps: true },
)

CartSchema.index({
	buyerUsername: 1, 
	productId: 1
}, {unique: true})

const Cart = mongoose.model('Cart', CartSchema)

Cart.on('index', error => {
	if (error) {
		console.log(error)
	}
})

module.exports = Cart
