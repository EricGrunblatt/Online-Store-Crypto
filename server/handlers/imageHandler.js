const multer = require('multer')
const Image = require('../models/imageModel')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')
const dotenv = require('dotenv')

dotenv.config()

// mimeTypeToExtension = (mimetype) => {
//     let result = null
//     if (mimetype === "image/png") {
//         result = ".png"
//     }
//     else if (mimetype === "image/jpeg") {
//         result = ".jpeg"
//     }
//     return result
// }

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const mimetype = file.mimetype
        const extension = mime.extension(mimetype)
		const image = new Image({
			mimetype: mimetype,
			extension: extension,
		})
		image.save()
        cb(null, image._id + "." + extension)
    }
});

const upload = multer({storage: storage})

// createAndSaveImage = async (file, description) => {
// 	const image = new Image({
// 		data: fs.readFileSync(path.join(__dirname + '/../uploads/' + file.filename)),
// 		contentType: 'image/png',
// 		description: description
// 	})
// 	await image.save()
// 	return image._id
// }

const generateImageUrl = (imageId) => {
	const ip = process.env.IP
	const port = process.env.PORT
	return `http://${ip}:${port}/api/image/${imageId}`
}

const parseImageId = (image) => {
	return image.filename.split(".")[0]
}

module.exports = { 
	upload,
	generateImageUrl,
	parseImageId,
}