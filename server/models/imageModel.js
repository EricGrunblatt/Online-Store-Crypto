const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ImageSchema = new Schema(
	{
		data: {type: Buffer, required: true},
		contentType: {type: String, required: true},
		description: {type: String, default: ""}
	},
	{ timestamps: true },
)

module.exports = mongoose.model('Image', ImageSchema)