const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ImageSchema = new Schema(
	{
		mimetype: {type: String, required: true},
		extension: {type: String, required: true},
		description: {type: String, default: ""}
	},
	{ timestamps: true },
)

const Image = mongoose.model('Image', ImageSchema)

Image.on('index', error => {
	if (error) {
		console.log(error)
	}
})

module.exports = Image
