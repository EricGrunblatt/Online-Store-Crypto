const { upload, createAndSaveImage } = require("../handlers/imageHandler")
const Product = require("../models/productModel")
const User = require('../models/userModel')
const Review = require('../models/reviewModel')
const constants = require('./constants.json')
const {
	productImageMiddleware,
	updateProductImageFields,
	getProductImages,
	getProductFirstImage,
	getProducts
} = require('./helpers/productControllerHelper')

getCatalog = async (req, res) => {
	console.log("getCatalog", req.body)

	const {search, category, condition, minPrice, maxPrice, sortBy} = req.body

	let searchWords = search ? search.split(" ") : []

	// TODO: filter out common words

	// TODO: allow search through product descriptions

	let productQuery = {}

	let searchQuery = []
	const searchKeys = [
		"name", "description"
	]
	const searchOptions = "i"
	for (const searchWord of searchWords) {
		for (const searchKey of searchKeys) {
			searchQuery.push({[searchKey]: new RegExp(searchWord, searchOptions)})
		}
	}
	if (searchQuery.length > 0) {
		productQuery.$or = searchQuery
	}

	if (category) {
		productQuery.category = category
	}
	if (condition) {
		condition ? productQuery.condition = condition : null
	}
	const isMinPriceDefined = typeof minPrice !== 'undefined'
	const isMaxPriceDefined = typeof maxPrice !== 'undefined'
	if (isMinPriceDefined || isMaxPriceDefined) {
		productQuery.price = {}
	}
	if (isMinPriceDefined) {
		productQuery.price.$gte = minPrice
	}
	if (isMaxPriceDefined) {
		productQuery.price.$lte = maxPrice
	}

	console.log("PRODUCT QUERY: ", productQuery)


	sortQuery = {}
	if (sortBy === "DATE_DESCENDING") { // NEWEST TO OLDEST
		sortQuery = {createdAt: -1}
	}
	else if (sortBy === "DATE_ASCENDING") { // OLDEST TO NEWEST
		sortQuery = {createdAt: 1}
	}
	else if (sortBy === "PRICE_ASCENDING") {
		sortQuery = {price: 1}
	}
	else if (sortBy === "PRICE_DESCENDING") {
		sortQuery = {price: -1}
	}
	console.log("SORT QUERY: ", sortQuery)

	let json = {}
	let products = {}
	try {
		products = await Product.find(productQuery).sort(sortQuery)
		json = {status: constants.status.OK, products: products}
		console.log("RESPONSE: ", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send({status: constants.status.FATAL_ERROR})
	}
}

getProduct = async (req, res) => {
	console.log("getProduct", req.body)
	const _id = req.body._id;

	let json = {}
	let product = null
	let review = null
	let images = null
	try {
		if (!_id) {
			json = {status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField}
		}
		else if (! (product = await Product.findById(_id))) {
			json = {status: constants.status.ERROR, errorMessage: constants.product.productDoesNotExist}
		}
		else if ((product.reviewId) && (!(review = await Review.findById(product.reviewId)))) {
			json = {status: constants.status.ERROR, errorMessage: constants.product.reviewSpecifiedButNotFound}
		}
		else if (! (images = await getProductImages(product))) {
			json = {status: constants.status.ERROR, errorMessage: constants.product.failedToGetImages}
		}
		else {
			const isSold = !! (product.buyerUsername || product.dateSold)

			json = {status: constants.status.OK, product: {
				_id: _id,
				name: product.name,
				description: product.description,
				condition: product.condition,
				category: product.category,
				sellerUsername: product.sellerUsername,
				isSold: isSold,
				price: product.price,
				shippingPrice: product.shippingPrice,
				boxLength: product.boxLength,
				boxWidth: product.boxWidth,
				boxHeight: product.boxHeight,
				boxWeight: product.boxWeight,
				review: review,
				images: images,
			}}
		}
		console.log("RESPONSE: ", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

getOrderedProductsForUser = async (req, res) => {
	console.log("getOrderedProductsForUser", req.body)

	const userId = req.userId

	let json = {}
	let user = null
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
		}
		else if (!(user = await User.findById(userId))) {
			json = {status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist}
		}
		else {
			const selectOptions = {
				_id: 1, 
				name: 1, 
				price: 1, 
				shippingPrice: 1, 
				sellerUsername: 1,
				imageIds: 1,
				dateSold: 1,
				reviewId: 1
			}

			let products = await Product.find({buyerUsername: user.username}).lean().select(selectOptions)
			
			products = await Promise.all(products.map(async (product) => {
				const image = await getProductFirstImage(product);
				product.image = image
				delete product.imageIds

				const review = await getProductReview(product)
				product.review = review
				delete product.reviewId

				return product;
			}))

			json = {status: constants.status.OK, products: products}
		}
		res.status(200).send(json)
	} catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
	// status: 'OK'
	// products: [{
	// 	_id: ObjectId
	// 	name: String
	// 	price: Number
	//  shippingPrice: Number
	// 	sellerUsername: String
	// 	image: {
	// 		data: Buffer,
	// 		contentType: String
	// 	}
	// 	dateSold: Date
	// 	review: {
	// 		stars: Number
	// 		comment: String
	// 	}
	// }]
}

getCartProductsForUser = async (req, res) => {
	console.log("getCartProductsForUser", req.body)
	
	const userId = req.userId

	let json = {}
	let user = null
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
		}
		else if (!(user = await User.findById(userId))) {
			json = {status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist}
		}
		else {
			const selectOptions = {
				_id: 1, 
				name: 1, 
				price: 1, 
				shippingPrice: 1, 
				sellerUsername: 1,
				imageIds: 1,
				dateListed: "$createdAt"
			}

			let products = await getProducts(user.cartProductIds, selectOptions)
			
			products = await Promise.all(products.map(async (product) => {
				const image = await getProductFirstImage(product);
				product.image = image
				delete product.imageIds
				return product;
			}))

			json = {status: constants.status.OK, products: products}
		}
		res.status(200).send(json)
	} catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
	// status: 'OK'
	// products: [{
	// 	_id: ObjectId
	// 	name: String
	// 	price: Number
	//  shippingPrice: Number
	// 	sellerUsername: String
	// 	image: {
	// 		data: Buffer,
	// 		contentType: String
	// 	}
	// }]
}

getListingProductsForUser = async (req, res) => {
	console.log("getListingProductsForUser", req.body)

	const userId = req.userId

	let json = {}
	let user = null
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
		}
		else if (!(user = await User.findById(userId))) {
			json = {status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist}
		}
		else {
			const selectOptions = {
				_id: 1, 
				name: 1, 
				price: 1, 
				shippingPrice: 1, 
				sellerUsername: 1,
				imageIds: 1,
				dateListed: "$createdAt"
			}

			let products = await Product.find({sellerUsername: user.username}).lean().select(selectOptions)
			
			products = await Promise.all(products.map(async (product) => {
				const image = await getProductFirstImage(product);
				product.image = image
				delete product.imageIds
				return product;
			}))

			json = {status: constants.status.OK, products: products}
		}
		res.status(200).send(json)
	} catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
	// status: 'OK'
	// products: [{
	// 	_id: ObjectId
	// 	name: String
	// 	price: Number
	//  shippingPrice: Number
	// 	sellerUsername: String
	// 	image: {
	// 		data: Buffer,
	// 		contentType: String
	// 	}
	// 	dateListed: Date
	// }]
}

getSellingProductsForUser = async (req, res) => {
	console.log("getSellingProductsForUser", req.body)
	
	const userId = req.userId

	let json = {}
	let user = null
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
		}
		else if (!(user = await User.findById(userId))) {
			json = {status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist}
		}
		else {
			const selectOptions = {
				_id: 1, 
				name: 1, 
				price: 1, 
				shippingPrice: 1, 
				sellerUsername: 1,
				imageIds: 1,
				dateListed: "$createdAt"
			}

			let products = await Product.find({sellerUsername: user.username, buyerUsername: null}).lean().select(selectOptions)
			
			products = await Promise.all(products.map(async (product) => {
				const image = await getProductFirstImage(product);
				product.image = image
				delete product.imageIds
				return product;
			}))

			json = {status: constants.status.OK, products: products}
		}
		res.status(200).send(json)
	} catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}

	// status: 'OK'
	// products: [{
	// 	_id: ObjectId
	// 	name: String
	// 	price: Number
	//  shippingPrice: Number
	// 	sellerUsername: String
	// 	image: {
	// 		data: Buffer,
	// 		contentType: String
	// 	}
	//  dateListed: date
	// }]
}

addListingProduct = async (req, res) => {
	productImageMiddleware(req, res, async () => {
		console.log("addListingProduct", req.body)

		const userId = req.userId
		const {name, description, condition, category} = req.body
		const {price, boxLength, boxWidth, boxHeight, boxWeight} = req.body
		const images = req.files

		let json = {}
		let user = null
		try {
			if (!userId) {
				throw constants.error.didNotGetUserId
			}
			else if (!name || !description || !condition || !category) {
				json = {status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField}
			}
			else if (!price || !boxLength || !boxWidth || !boxHeight || !boxWeight) {
				json = {status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField}
			}
			else if (Object.keys(images).length === 0) {
				json = {status: constants.status.ERROR, errorMessage: constants.product.missingImages}
			}
			else if (! (user = await User.findById(userId))) {
				json = {status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist}
			}
			else {
				// TODO: Calculate shipping price via api
				const shippingPrice = boxLength * boxWidth * boxHeight * boxWeight
		
				let product = new Product({
					name: name,
					description: description,
					condition: condition,
					category: category,
					sellerUsername: user.username,
					price: price,
					shippingPrice: shippingPrice,
					boxLength: boxLength,
					boxWidth: boxWidth,
					boxHeight: boxHeight,
					boxWeight: boxWeight,
					imageIds: []
				})
		
				// ADD IMAGE FILES
				product.imageIds = await updateProductImageFields(images, [...product.imageIds], product._id)

				// SAVE THE 
				await product.save()

				json = {status: constants.status.OK, product: {
					_id: product._id,
					name: product.name,
					description: product.description,
					condition: product.condition,
					category: product.category,
					sellerUsername: user.username,
					price: product.price,
					shippingPrice: product.shippingPrice
				}}
			}
			console.log("RESPONSE: ", json)
			res.status(200).json(json)
		}
		catch (err) {
			console.log(err)
			res.status(500).send(constants.status.FATAL_ERROR)
		}
	})
}

updateListingProduct = async (req, res) => {
	productImageMiddleware(req, res, async () => {
		console.log("updateListingProduct", req.body)

		const userId = req.userId
		const {_id, name, description, condition, category} = req.body
		const {price, boxLength, boxWidth, boxHeight, boxWeight} = req.body
		const images = req.files

		let json = {}
		let user = null
		let product = null
		try {
			if (!userId) {
				throw constants.error.didNotGetUserId
			}
			else if (!_id || !name || !description || !condition || !category) {
				json = {status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField}
			}
			else if (!price || !boxLength || !boxWidth || !boxHeight || !boxWeight) {
				json = {status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField}
			}
			else if (! (user = await User.findById(userId))) {
				json = {status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist}
			}
			else if (! (product = await Product.findById(_id))) {
				json = {status: constants.status.ERROR, errorMessage: constants.product.productDoesNotExist}
			}
			else if (product.sellerUsername !== user.username) {
				json = {status: constants.status.ERROR, errorMessage: constants.product.youAreNotTheSeller}
			}
			else if (product.dateSold || product.buyerUsername) {
				json = {status: constants.status.ERROR, errorMessage: constants.product.productIsSold}
			}
			else {
				// TODO: Calculate shipping price via api
				const shippingPrice = boxLength * boxWidth * boxHeight * boxWeight
				
				product.name = name
				product.description = description
				product.condition = condition
				product.category = category
				product.price = price
				product.boxLength = boxLength
				product.boxWidth = boxWidth
				product.boxHeight = boxHeight
				product.boxWeight = boxWeight
				product.shippingPrice = shippingPrice
		
				// ADD IMAGE FILES
				product.imageIds = await updateProductImageFields(images, [...product.imageIds], _id)

				// SAVE THE 
				await product.save()

				json = {status: constants.status.OK, product: {
					_id: _id,
					name: product.name,
					description: product.description,
					condition: product.condition,
					category: product.category,
					sellerUsername: user.username,
					price: product.price,
					shippingPrice: product.shippingPrice
				}}
			}
			console.log("RESPONSE: ", json)
			res.status(200).json(json)
		}
		catch (err) {
			console.log(err)
			res.status(500).send(constants.status.FATAL_ERROR)
		}
	})
}

// TODO
deleteListingProduct = async (req, res) => {
	console.log("deleteListingProduct")
}

module.exports = {
	getCatalog,
	getProduct,
	getOrderedProductsForUser,
	getCartProductsForUser,
	getListingProductsForUser,
	getSellingProductsForUser,
	addListingProduct,
	updateListingProduct,
	deleteListingProduct
}