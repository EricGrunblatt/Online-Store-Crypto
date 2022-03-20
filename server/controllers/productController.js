const { upload } = require("../handlers/imageHandler")

// TODO
getCatalog = async (req, res) => {
	console.log("getCatalog")
	const search = req.body.search
	const category = req.body.category
	const condition = req.body.condition
	const minPrice = req.body.minPrice
	const maxPrice = req.body.maxPrice
	const sortBy = req.body.sortBy
	
}

// TODO
getProduct = async (req, res) => {
	console.log("getProduct")
	const id = req.body.id;
	
}

// TODO
getOrderedProductsForUser = async (req, res) => {
	console.log("getOrderedProductsForUser")
	// status: 'OK'
	// products: [{
	// 	_id: ObjectId
	// 	name: String
	// 	cost: Number
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

// TODO
getCartProductsForUser = async (req, res) => {
	console.log("getCartProductsForUser")
	// status: 'OK'
	// products: [{
	// 	_id: ObjectId
	// 	name: String
	// 	cost: Number
	// 	sellerUsername: String
	// 	image: {
	// 		data: Buffer,
	// 		contentType: String
	// 	}
	// }]
}

// TODO
getListingProductsForUser = async (req, res) => {
	console.log("getListingProductsForUser")
	// status: 'OK'
	// products: [{
	// 	_id: ObjectId
	// 	name: String
	// 	cost: Number
	// 	sellerUsername: String
	// 	image: {
	// 		data: Buffer,
	// 		contentType: String
	// 	}
	// 	dateListed: Date
	// }]
}

// TODO
getSellingProductsForUser = async (req, res) => {
	console.log("getSellingProductsForUser")
	// status: 'OK'
	// products: [{
	// 	_id: ObjectId
	// 	name: String
	// 	cost: Number
	// 	sellerUsername: String
	// 	image: {
	// 		data: Buffer,
	// 		contentType: String
	// 	}
	// 	dateSold: Date
	// }]
}

// TODO
addListingProduct = async (req, res) => {
	console.log("addListingProduct")

	const userId = req.userId
	const {name, category, condition, description} = req.body
	const {price, boxLength, boxWidth, boxHeight} = req.body
	const images = req.files
	
	const imageMiddleware = upload.array('image')
	imageMiddleware(req, res, async () => {
		console.log(req.files)
	})
}

// TODO
updateListingProduct = async (req, res) => {
	console.log("updateListingProduct")

	const userId = req.userId
	const {id, name, category, condition, description} = req.body
	const {price, boxLength, boxWidth, boxHeight} = req.body
	const images = req.files
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