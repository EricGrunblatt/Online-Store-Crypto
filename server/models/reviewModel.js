const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ReviewSchema = new Schema(
	{
		forUsername: {type: String, required: true},
		byUsername: {type: String, required: true},
		stars: {type: Number, required: true},
		comment: {type: String, default: null}
	},
	{ timestamps: true },
)

const Review = mongoose.model('Review', ReviewSchema)

Review.on('index', error => {
	if (error) {
		console.log(error)
	}
})

module.exports = Review
