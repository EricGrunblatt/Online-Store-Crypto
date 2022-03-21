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
	
	// REQUEST BODY DATA
	const {username} = req.body

	let user = null
	let json = {}
	try {
		// CHECK USERNAME DEFINED
		if (!username) {
			json = {status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField}
		}
		// CHECK USER WITH USERNAME EXISTS
		else if (! (user = await User.findOne({username: username}))) {
			json = {status: constants.status.ERROR, errorMessage: constants.user.userDoesNotExist}
		}
		else {
			// GET PROFILE IMAGE
			const profileImage = await Image.findById(user.profileImageId)
				.select({"_id": 0, "data": 1, "contentType": 1})
			// GET USER'S SELLING PRODUCTS
			const sellingProducts = await Products.find({sellerUsername: username, buyerUsername: null})
				.select({"_id": 1, "name": 1, "price": 1, "sellerUsername": 1, "dateListed": 1})
			// GET USER'S REVIEWS
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
	console.log("getAccount", req.body)
	const userId = req.userId

}

// TODO
updateAccount = async (req, res) => {
	console.log("updateAccount", req.body)
	const userId = req.userId

}

updateProfileImage = async (req, res) => {
	// NOTE: data must be sent in form-data format with the image value at key value "image"
	console.log("updateProfileImage", req.body)
	
	// SETUP IMAGE MIDDLEWARE
	const imageMiddleware = upload.single('image')
	imageMiddleware(req, res, async () => {
		const userId = req.userId
		const file = req.file

		let json = {}
		let user = null
		try {
			// CHECK FILE EXISTS
			if (!file) {
				json = {status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField}
			}
			// CHECK USERID DEFINED
			else if (!userId) {
				throw "did not get a userId"
			}
			// CHECK USER EXISTS
			else if (! (user = await User.findById(userId))) {
				json = {status: constants.status.ERROR, errorMessage: constants.user.userDoesNotExist}
			}
			else {
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
	console.log("writeReview", req.body)
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