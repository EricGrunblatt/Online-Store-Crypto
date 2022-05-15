const path = require('path')
const mime = require('mime-types')
const Image = require('../models/imageModel')

image = async (req, res) => {
	console.log("image", req.body)
	const id = req.params.id
	console.log("id: ", id)

	const file = await Image.findById(id)
	try{
	const mimetype = file.mimetype
	const extension = mime.extension(mimetype)
	const file_path = path.join(__dirname + "/../uploads/" + id + "." + extension)
	res.sendFile(file_path)
	}
	catch(e){
		console.log("image not exist:",e);
	}
}

module.exports = {
	image
}