const { upload } = require("../handlers/imageHandler")
const {Product, ProductState} = require("../models/productModel")
const User = require('../models/userModel')
const Review = require('../models/reviewModel')
const constants = require('./constants.json')
const xml2js= require('xml2js')
const axios=require("axios")
const Cart = require('../models/cartModel')
const { Order, OrderState} = require('../models/orderModel')

const {
	productImageMiddleware,
	updateProductImageFields,
	getProductImages,
	getProductFirstImage,
	getProducts
} = require('./helpers/productControllerHelper')

getCatalog = async (req, res) => {
	console.log("getCatalog", req.body)

	const {search, categories, conditions, minPrice, maxPrice, sortBy} = req.body

	let searchWords = search ? search.split(" ") : []

	// TODO: filter out common words

	// TODO: allow search through product descriptions

	let productQuery = {}

	let productQueryArray = []

	let searchQuery = []
	const searchKeys = [
		"name", "description"
	]
	const searchOptions = "i"
	for (const searchWord of searchWords) {
		for (const searchKey of searchKeys) {
			searchQuery.push({ [searchKey]: new RegExp(searchWord, searchOptions) })
		}
	}
	if (searchQuery.length > 0) {
		productQueryArray.push({$or: searchQuery})
	}

	let categoryQuery = []
	if (categories && (categories.length > 0)) {
		for(const category of categories) {
			categoryQuery.push({category: category})
		}
		productQueryArray.push({$or: categoryQuery})
	}

	let conditionQuery = []
	if (conditions && (conditions.length > 0)) {
		for(const condition of conditions) {
			conditionQuery.push({condition: condition})
		}
		productQueryArray.push({$or: conditionQuery})
	}

	const isMinPriceDefined = typeof minPrice !== 'undefined'
	const isMaxPriceDefined = typeof maxPrice !== 'undefined'
	if (isMinPriceDefined && isMaxPriceDefined) {
		productQueryArray.push({price: {$gte: minPrice, $lte: maxPrice}})
	}
	else if (isMinPriceDefined) {
		productQueryArray.push({price: {$gte: minPrice}})
	}
	else if (isMaxPriceDefined) {
		productQueryArray.push({price: {$lte: maxPrice}})
	}

	/** Insert additional checks for products here */

	productQueryArray.push({state: ProductState.LISTED})

	if (productQueryArray.length > 0)
		productQuery.$and = productQueryArray

	console.log("PRODUCT QUERY: ", productQuery)
	console.dir(productQuery, {depth: null})

	sortQuery = {}
	if (sortBy === "DATE_DESCENDING") { // NEWEST TO OLDEST
		sortQuery = { createdAt: -1 }
	}
	else if (sortBy === "DATE_ASCENDING") { // OLDEST TO NEWEST
		sortQuery = { createdAt: 1 }
	}
	else if (sortBy === "PRICE_ASCENDING") {
		sortQuery = { price: 1 }
	}
	else if (sortBy === "PRICE_DESCENDING") {
		sortQuery = { price: -1 }
	}
	console.log("SORT QUERY: ", sortQuery)

	const productSelect = {
		_id: 1,
		name: 1,
		price: 1,
		shippingPrice: 1,
		sellerUsername: 1,
		imageIds: 1,
		dateListed: "$createdAt"
	}

	let json = {}
	let products = {}
	try {
		products = await Product
			.find(productQuery)
			.lean()
			.sort(sortQuery)
			.select(productSelect)

		products = await Promise.all(products.map(async (product) => {
			const image = await getProductFirstImage(product);
			product.image = image
			delete product.imageIds

			return product;
		}))

		json = { status: constants.status.OK, products: products }
		console.log("RESPONSE: ", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send({ status: constants.status.FATAL_ERROR })
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
			json = { status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField }
		}
		else if (!(product = await Product.findById(_id))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.productDoesNotExist }
		}
		else if ((product.reviewId) && (!(review = await Review.findById(product.reviewId)))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.reviewSpecifiedButNotFound }
		}
		else if (!(images = await getProductImages(product))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.failedToGetImages }
		}
		else {
			const isSold = ! (product.state === ProductState.LISTED)

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
			json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist }
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

			let products = await Product.find({state: ProductState.SOLD, buyerUsername: user.username})
				.lean().select(selectOptions)
			
			products = await Promise.all(products.map(async (product) => {
				const image = await getProductFirstImage(product);
				product.image = image
				delete product.imageIds

				const review = await getProductReview(product)
				product.review = review
				delete product.reviewId

				return product;
			}))

			json = { status: constants.status.OK, products: products }
		}
		console.log("RESPONSE: ", json)
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
			json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist }
		}
		else {
			const selectOptions = {
				_id: 1,
				name: 1,
				price: 1,
				shippingPrice: 1,
				sellerUsername: 1,
				imageIds: 1,
				dateListed: "$createdAt",
				state: 1,
			}

			let cartItems = await Cart.find({buyerUsername: user.username}).select({productId: 1})
			let cartProductIds = cartItems.map(cartItem => cartItem.productId)

			let reservedProducts = await Order.find({
				buyerUsername: user.username,
				state: OrderState.PENDING,
			}).select({productId: 1})
			let reservedProductIds = reservedProducts.map(reservedProduct => reservedProduct.productId)

			let products = await getProducts([...cartProductIds, ...reservedProductIds], selectOptions)
			
			products = await Promise.all(products.map(async (product) => {
				const image = await getProductFirstImage(product);
				product.image = image
				delete product.imageIds
				return product;
			}))

			json = { status: constants.status.OK, products: products }
		}
		console.log("RESPONSE: ", json)
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
			json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist }
		}
		else {
			const findOptions = {
				sellerUsername: user.username,
				$or: [
					{state: ProductState.LISTED},
					{state: ProductState.SOLD}
				]
			}

			const selectOptions = {
				_id: 1,
				name: 1,
				price: 1,
				shippingPrice: 1,
				sellerUsername: 1,
				imageIds: 1,
				dateListed: "$createdAt",
				trackingNumber: 1,
				dateSold: 1,
				buyerUsername: 1,
			}

			let products = await Product.find(findOptions).lean().select(selectOptions)

			products = await Promise.all(products.map(async (product) => {
				const image = await getProductFirstImage(product);
				product.image = image
				delete product.imageIds
				return product;
			}))

			json = { status: constants.status.OK, products: products }
		}
		console.log("RESPONSE: ", json)
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
			json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist }
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

			let products = await Product.find({sellerUsername: user.username, state: ProductState.LISTED}).lean().select(selectOptions)
			
			products = await Promise.all(products.map(async (product) => {
				const image = await getProductFirstImage(product);
				product.image = image
				delete product.imageIds
				return product;
			}))

			json = { status: constants.status.OK, products: products }
		}
		console.log("RESPONSE: ", json)
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
		const { name, description, condition, category } = req.body
		const { price, boxLength, boxWidth, boxHeight, boxWeight } = req.body
		const images = req.files

		let json = {}
		let user = null
		try {
			if (!userId) {
				throw constants.error.didNotGetUserId
			}
			else if (!name || !description || !condition || !category) {
				json = { status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField }
			}
			else if (!price || !boxLength || !boxWidth || !boxHeight || !boxWeight) {
				json = { status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField }
			}
			else if (Object.keys(images).length === 0) {
				json = { status: constants.status.ERROR, errorMessage: constants.product.missingImages }
			}
			else if (!(user = await User.findById(userId))) {
				json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist }
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

				json = {
					status: constants.status.OK, product: {
						_id: product._id,
						name: product.name,
						description: product.description,
						condition: product.condition,
						category: product.category,
						sellerUsername: user.username,
						price: product.price,
						shippingPrice: product.shippingPrice
					}
				}
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
		const { _id, name, description, condition, category } = req.body
		const { price, boxLength, boxWidth, boxHeight, boxWeight } = req.body
		const images = req.files

		let json = {}
		let user = null
		let product = null
		try {
			if (!userId) {
				throw constants.error.didNotGetUserId
			}
			else if (!_id || !name || !description || !condition || !category) {
				json = { status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField }
			}
			else if (!price || !boxLength || !boxWidth || !boxHeight || !boxWeight) {
				json = { status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField }
			}
			else if (!(user = await User.findById(userId))) {
				json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist }
			}
			else if (!(product = await Product.findById(_id))) {
				json = { status: constants.status.ERROR, errorMessage: constants.product.productDoesNotExist }
			}
			else if (product.sellerUsername !== user.username) {
				json = { status: constants.status.ERROR, errorMessage: constants.product.youAreNotTheSeller }
			}
			else if (product.state !== ProductState.LISTED) {
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

				json = {
					status: constants.status.OK, product: {
						_id: _id,
						name: product.name,
						description: product.description,
						condition: product.condition,
						category: product.category,
						sellerUsername: user.username,
						price: product.price,
						shippingPrice: product.shippingPrice
					}
				}
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
	console.log("deleteListingProduct", req.body)
	const _id = req.body._id;
	const userId = req.userId;

	let json = {}
	let user = null
	let product = null
	try {
		if (!userId) {
			throw "did not get a userId"
		}
		else if (!(user = await User.findOne({ _id: userId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist };
		}
		else if (!(product = await Product.findOne({ _id: _id, state: ProductState.LISTED }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.productDoesNotExist }
		}
		else if (product.sellerUsername !== user.username) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.youAreNotTheSeller }
		}
		else {
			product.state = ProductState.DELETED
			await product.save()
			json = { status: constants.status.OK }
		}
		console.log("RESPONSE: ", json);
		res.status(200).json(json).send();
	}
	catch (err) {
		console.log(err);
		res.status(500).send(constants.status.FATAL_ERROR);
	}


}

// TODO
getShippingPrice = async (req, res) => {
	console.log("getShippingPrice", req.body)
	const _id = req.body._id; //product id
	const userId = req.userId;

	let json = {};
	let seller = null;
	let buyer=null;
	let product=null

	try {
		if (!userId) {
			throw "did not get a userId"
		}

		else if (!(buyer = await User.findOne({ "_id": userId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist };
						console.log("RESPONSE: ", json);
			return res.status(200).json(json).send();
		}
		else if (!(product = await Product.findOne({ "_id": _id }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.productDoesNotExist }
			return res.status(200).json(json).send();
		}
		else if (!(seller = await User.findOne({ "username": product.sellerUsername }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist };
			onsole.log("RESPONSE: ", json);
			return res.status(200).json(json).send();
		}
		let zipDestination=buyer.zipcode;
		let zipOrigination=seller.zipcode;
		let boxWeight=product.boxWeight;
		let boxWidth=product.boxWidth;
		let boxLength=product.boxLength;
		let boxHeight=product.boxHeight;
		var xml =`<RateV4Request USERID="726CRYPT0533">
        <Revision></Revision>
        <Package ID="0">
        <Service>PRIORITY</Service>
        <ZipOrigination>${zipOrigination}</ZipOrigination>
        <ZipDestination>${zipDestination}</ZipDestination>
        <Pounds>${boxWeight}</Pounds>
        <Ounces>0</Ounces>
        <Container></Container>
        <Width>${boxWidth}</Width>
        <Length>${boxLength}</Length>
        <Height>${boxHeight}</Height>
        <Girth></Girth>
        <Machinable>TRUE</Machinable>
        </Package>
        </RateV4Request>`;
		
		let response = await axios.get('https://secure.shippingapis.com/ShippingAPI.dll?API=RateV4&XML=' + xml, {
			headers: {
				'Content-Type': 'application/xml',
			},
		})
		

		if (!(response)) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.failedToGetShippingPrice };
			console.log("RESPONSE: ", json);
			return res.status(200).json(json).send();
		}
		let parser=new xml2js.Parser();
		parser.parseString(response.data, function (err, result) {

			if (err) {
				json = { status: constants.status.ERROR, errorMessage: err };
			}
			else if (result.Error) {
				json = { status: constants.status.ERROR, errorMessage: result.Error.Description };
			}
			else if (result["RateV4Response"]["Package"][0]["Error"]) {
				json = { status: constants.status.ERROR, errorMessage: result["RateV4Response"]["Package"][0]["Error"][0].Description };
			}
			else {
				let detail = result["RateV4Response"]["Package"][0]["Postage"][0];
				let price=detail["Rate"][0];
				let service=detail["MailService"][0];
				let index=service.indexOf("&");
				if (index!=-1){
					service=service.substring(0,index);
				}
				json = {
					status: constants.status.OK,
					shippingPrice: price,
					shippingService: service
				}
			}

		});
		console.log("RESPONSE: ", json);
		res.status(200).json(json).send();
	}
	catch (err) {
		console.log(err);
		res.status(500).send(constants.status.FATAL_ERROR);
	}
}

// TODO
getShippingInfo = async (req, res) => {
	console.log("getShippingInfo", req.body)
	const {productId} = req.body
	const userId = req.userId

	const buyerUserSelect = {
		_id: 0,
		firstName: 1,
		lastName: 1,
		addressFirstLine: 1,
		addressSecondLine: 1,
		city: 1,
		state: 1,
		zipcode: 1,
	}

	let json = {}
	let user = null
	let product = null
	let buyerUsername = null
	let buyerUser = null
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
		}
		if (!productId) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField }
		}
		else if (!(user = await User.findById(userId))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist }
		}
		else if (!(product = await Product.findById(productId))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.productDoesNotExist }
		}
		else if (product.sellerUsername !== user.username) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.youAreNotTheSeller }
		}
		else if (product.state !== ProductState.SOLD) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.productIsNotSold }
		}
		else if (!(buyerUsername = product.buyerUsername)) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.buyerUsernameIsNull }
		}
		else if (!(buyerUser = await User.find({username: buyerUsername}).select(buyerUserSelect))) {
			json = { status: constants.status.ERROR, errorMessage: cosntants.product.buyerUserDoesNotExist }
		}
		else {
			json = { status: constants.status.OK, user: buyerUser }
		}
		console.log("RESPONSE: ", json)
		res.status(200).send(json)
	} catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

// TODO
setTrackingNumber = async (req, res) => {
	const userId = req.userId
	const productId = req.body.productId
	const trackingNumber = req.body.trackingNumber

	let json = {}
	let user = null
	let product = null
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
		}
		else if (!(user = await User.findById(userId))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.userDoesNotExist }
		}
		else if (!(product = await Product.findById(productId))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.productDoesNotExist }
		}
		else if (product.sellerUsername !== user.username) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.youAreNotTheSeller }
		}
		else if (product.state !== ProductState.SOLD) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.productIsNotSold }
		}
		else if (product.trackingNumber) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.trackingNumberIsAlreadySet }
		}
		else {
			product.trackingNumber = trackingNumber
			await product.save()
			json = { status: constants.status.OK }
		}
		console.log("RESPONSE: ", json)
		res.status(200).send(json)
	} catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
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
	deleteListingProduct,
	getShippingPrice,
	getShippingInfo,
	setTrackingNumber,
}