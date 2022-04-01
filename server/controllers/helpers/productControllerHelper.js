const {createAndSaveImage, upload} = require('../../handlers/imageHandler')
const Image = require('../../models/imageModel')
const Review = require('../../models/reviewModel')

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
	const imageSelect = {
		_id: 0,
		data: 1,
		contentType: 1
	}

	try {
		for (let imageId of product.imageIds) {
			if (imageId) {
				const image = await Image.findById(imageId).select(imageSelect);
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

getProductFirstImage = async (product) => {
	const imageSelect = {
		_id: 0,
		data: 1,
		contentType: 1
	}

	try {
		const firstImageId = product.imageIds.find(imageId => imageId !== null)
		const image = await Image.findById(firstImageId).select(imageSelect);
		return image
	}
	catch (err) {
		console.log(err)
		return []
	}
}

getProductReview = async (product) => {
	const reviewSelect = {
		_id: 0,
		stars: 1,
		comment: 1
	}

	try {
		return await Review.findById(product.reviewId).select(reviewSelect);
	}
	catch (err) {
		console.log(err)
		return null
	}
}

module.exports = {
	productImageMiddleware, 
	updateProductImageFields, 
	getProductImages, 
	getProductFirstImage,
	getProductReview
}