const multer = require('multer')
const Image = require('../models/imageModel')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads')
	},
	filename: (req, file, cb) => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
		cb(null, file.fieldname + '-' + uniqueSuffix)
	}
})

const upload = multer({storage: storage})

createAndSaveImage = async (file, description) => {
	const image = new Image({
		data: fs.readFileSync(path.join(__dirname + '/../uploads/' + file.filename)),
		contentType: 'image/png',
		description: description
	})
	image.save()
	return image._id
}

module.exports = {upload, createAndSaveImage}