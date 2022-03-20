const { application } = require('express')
const User = require('../models/userModel')
const constants = require('./constants.json')
const Image = require('../models/imageModel')
const fs = require('fs')
const path = require('path')
const { createAndSaveImage, upload } = require('../handlers/imageHandler')
const Products = require('../models/productModel')
const Review = require('../models/reviewModel')

getProfileByUsername = async (req, res) => {
	console.log("getProfile", req.body)
	
	const {username} = req.body

	let user = null
	let json = {}
	try {
		if (!username) {
			json = {status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField}
		}
		else if (! (user = await User.findOne({username: username}))) {
			json = {status: constants.status.ERROR, errorMessage: constants.user.userDoesNotExist}
		}
		else {
			const profileImage = await Image.findById(user.profileImageId)

			const sellingProducts = await Products.find({sellerUsername: username, buyerUsername: null})
				.select({"_id": 1, "name": 1, "price": 1, "sellerUsername": 1, "dateListed": 1})

			const reviews = await Review.find({forUsername: username})
				.select({"_id": 0, "byUsername": 1, "stars": 1, "comment": 1})

			json = {
				status: constants.status.OK,
				username: user.username,
				profileImage: profileImage,
				sellingProducts: sellingProducts,
				reviews: reviews,
				dateJoined: user.createdAt
			}
		}
		console.log("RESPONSE:", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

// TODO
getAccount = async (req, res) => {
	console.log("getAccount")
	const userId = req.userId

}

// TODO
updateAccount = async (req, res) => {
	console.log("updateAccount")
	const userId = req.userId

}

updateProfileImage = async (req, res) => {
	// NOTE: data must be sent in form-data format with the image value at key value "image"
	console.log("updateProfileImage", req.body)
	
	const imageMiddleware = upload.single('image')
	imageMiddleware(req, res, async () => {
		const userId = req.userId
		const file = req.file

		let json = {}
		try {
			if (!file) {
				json = {status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField}
			}
			else {
				const user = await User.findById(userId)
				const fileId = await createAndSaveImage(file, "profileImage for " + user.username);
				user.profileImageId = fileId
				await user.save()
				json = {status: constants.status.OK}
			}
			console.log("RESPONSE:", json)
			res.status(200).json(json)
		}
		catch (err) {
			console.log(err)
			res.status(500).send()
		}
	})
}

// TODO
writeReview = async (req, res) => {
	console.log("writeReview")
	const userId = req.userId
	const objectId = req.body.objectId
	const stars = req.body.stars
	const comment = req.body.comment
	
}

module.exports = {
	getProfileByUsername,
	getAccount,
	updateAccount,
	updateProfileImage,
	writeReview,
}