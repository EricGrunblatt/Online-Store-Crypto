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
	const id = req.params.id;
	
}

// TODO
getProductsForUser = async (req, res) => {
	console.log("getProductsForUser")
	const userId = req.userId
	const requestType = req.body.requestType
	if (requestType === 'ORDERED') {
		// status: 'OK'
		// _id: ObjectId
		// name: String
		// cost: Number
		// sellerUsername: String
		// image: {
		//     data: Buffer,
		//     contentType: String
		// }
		// dateSold: Date
		// review: {
		//     stars: Number
		//     comment: String
		// }
	}
	else if (requestType === 'CART') {
		// status: 'OK'
		// _id: ObjectId
		// name: String
		// cost: Number
		// sellerUsername: String
		// image: {
		//     data: Buffer,
		//     contentType: String
		// }
	}
	else if (requestType === 'LISTING') {
		// status: 'OK'
		// _id: ObjectId
		// name: String
		// cost: Number
		// sellerUsername: String
		// image: {
		//     data: Buffer,
		//     contentType: String
		// }
		// dateSold: Date
	}
	else if (requestType === 'SELLING') {
		// status: 'OK'
		// _id: ObjectId
		// name: String
		// cost: Number
		// sellerUsername: String
		// image: {
		//     data: Buffer,
		//     contentType: String
		// }
		// dateListed: Date
	}
	else {
		// status: 'ERROR'
		// errorMessage: String
	}
}

// TODO
sellProduct = async (req, res) => {
	console.log("sellProduct")
	const userId = req.userId
	const name = req.body.name
	const category = req.body.category
	// const image = 
	const condition = req.body.condition
	const description = req.body.description
	const price = req.body.price
	const boxLength = req.body.length
	const boxWidth = req.body.width
	const boxHeight = req.body.height
	
}

module.exports = {
	getCatalog,
	getProduct,
	getProductsForUser,
	sellProduct,
}