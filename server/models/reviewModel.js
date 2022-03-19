const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ReviewSchema = new Schema(
	{
		forUsername: {type: String, required: true},
		stars: {type: Number, required: true},
		comment: {type: String, default: null}
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Review', ReviewSchema)
