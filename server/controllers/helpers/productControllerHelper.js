const {createAndSaveImage, upload} = require('../../handlers/imageHandler')
const Image = require('../../models/imageModel')

const productImageFields = [
	{name: 'image0', maxCount: 1},
	{name: 'image1', maxCount: 1},
	{name: 'image2', maxCount: 1},
	{name: 'image3', maxCount: 1},
	{name: 'image4', maxCount: 1},
	{name: 'image5', maxCount: 1},
	{name: 'image6', maxCount: 1},
	{name: 'image7', maxCount: 1},
]

const productImageMiddleware = upload.fields(productImageFields)

updateProductImageFields = async (images, oldImageIds, productId) => {
	let fieldIndex = 0
	let imageIds = [...oldImageIds]
	for (let field of productImageFields) {
		const imageKey = field.name
		let imageId = null
		if (Object.keys(images).includes(imageKey)) {
			const imageValue = images[imageKey][0]
			imageId = await createAndSaveImage(imageValue, "product image key=" + imageKey + " for productId=" + productId)
		}
		imageIds[fieldIndex] = imageId || oldImageIds[fieldIndex]
		fieldIndex++
	}
	console.log(imageIds)
	return imageIds
}

getProductImages = async (product) => {
	let images = []
	try {
		for (let imageId of product.imageIds) {
			if (imageId) {
				const image = await Image.findById(imageId);
				images.push(image)
			}
			else {
				images.push(null)
			}
		}
		return images	
	}
	catch (err) {
		console.log("FAILED TO GET IMAGES")
		return []
	}
}

module.exports = {productImageMiddleware, updateProductImageFields, getProductImages}