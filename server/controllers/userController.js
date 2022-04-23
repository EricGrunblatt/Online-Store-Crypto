const { application } = require('express')
const bcryptjs = require('bcryptjs')
const User = require('../models/userModel')
const {Product, ProductState} = require('../models/productModel')
const Review = require('../models/reviewModel')
const constants = require('./constants.json')
const fs = require('fs')
const path = require('path')
const { upload, parseImageId, generateImageUrl } = require('../handlers/imageHandler')
const { json } = require('body-parser')
const {
	getProductFirstImage
} = require('./helpers/productControllerHelper')

getProfileByUsername = async (req, res) => {
	console.log("getProfile", req.body)

	// REQUEST BODY DATA
	const { username } = req.body

	let user = null
	let json = {}
	try {
		// CHECK USERNAME DEFINED
		if (!username) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField }
		}
		// CHECK USER WITH USERNAME EXISTS
		else if (!(user = await User.findOne({ username: username }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.userDoesNotExist }
		}
		else {
			// GET PROFILE IMAGE
			const profileImage = generateImageUrl(user.profileImageId)
			// GET USER'S SELLING PRODUCTS
			const sellingProducts = await Product.find({ sellerUsername: username, state: ProductState.LISTED })
				.lean()
				.select({ "_id": 1, "name": 1, "price": 1, "sellerUsername": 1, "dateListed": 1, "imageIds": 1})
			
			await Promise.all(sellingProducts.map(async (product) => {
				const image = await getProductFirstImage(product);
				product.image = image
				delete product.imageIds

				return product;
			}))

			// GET USER'S REVIEWS
			const reviews = await Review.find({ forUsername: username })
				.select({ "_id": 0, "byUsername": 1, "stars": 1, "comment": 1 })

			json = {
				status: constants.status.OK,
				username: user.username,
				profileImage: profileImage,
				sellingProducts: sellingProducts,
				reviews: reviews,
				dateJoined: user.createdAt
			}
		}
		console.log("RESPONSE: ", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err)
		res.status(500).send(constants.status.FATAL_ERROR)
	}
}

getAccount = async (req, res) => {
	console.log("getAccount", req.body)
	const userId = req.userId
	
	let json = {};
	let user=null;
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
		}

		else if (!(user = await User.findOne({ "_id": userId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.userDoesNotExist }
		}
		else {
			json = {
				status: constants.status.OK,
				user: {
					firstName: user.firstName,
					lastName: user.lastName,
					city: user.city,
					state: user.state,
					zipcode: user.zipcode,
					addressFirstLine: user.addressFirstLine,
					addressSecondLine: user.addressSecondLine,
					phoneNumber: user.phoneNumber
				}
			}
		}
		console.log("RESPONSE: ", json);
		res.status(200).json(json).send();
	}
	catch (err) {
		console.log(err);
		res.status(500).send(constants.status.FATAL_ERROR);
	}
}

updateAccount = async (req, res) => {
	console.log("updateAccount", req.body)
	const userId=req.userId;
	const { email,firstName, lastName, city, state, zipcode,
		oldPassword, newPassword, confirmPassword,
		addressFirstLine, addressSecondLine, phoneNumber } = req.body

	let json = {}
	let user = null
	let passwordHash = null
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
		}
		else if (!(user = await User.findOne({ "_id": userId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.userDoesNotExist };
		}
		else if(!firstName|| !lastName || !email || !city || !state || !zipcode || !addressFirstLine || !phoneNumber){
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField };
		}
		else if (!email.includes("@")) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.invalidEmail}
		}
		else if (newPassword && !oldPassword) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.oldPasswordNotProvided };
		}
		else if (oldPassword && !newPassword) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.newPasswordNotProvided };
		}
		else if (oldPassword && (newPassword !== confirmPassword)) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.newPasswordDoesNotMatchConfirmPassword };
		}
		else if (oldPassword && !(await bcryptjs.compare(oldPassword, user.passwordHash))) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.incorrectPassword };
		}
		else {
			if (oldPassword) {
				const saltRounds = 10;
				const salt = await bcryptjs.genSalt(saltRounds);
				passwordHash = await bcryptjs.hash(newPassword, salt);
			}

			passwordHash = passwordHash || user.passwordHash

			user.firstName = firstName;
			user.lastName = lastName;
			user.email=email;
			user.city = city;
			user.state = state;
			user.zipcode = zipcode;
			user.passwordHash = passwordHash;
			user.addressFirstLine = addressFirstLine;
			user.addressSecondLine = addressSecondLine;
			user.phoneNumber = phoneNumber;

			await user.save();
			json = { "status": constants.status.OK };
		}
		console.log("RESPONSE: ", json);
		res.status(200).json(json).send();
	}
	catch (err) {
		console.log(err);
		res.status(500).send(constants.status.FATAL_ERROR);
	}
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
				json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField }
			}
			// CHECK USERID DEFINED
			else if (!userId) {
				throw constants.error.didNotGetUserId
			}
			// CHECK USER EXISTS
			else if (!(user = await User.findById(userId))) {
				json = { status: constants.status.ERROR, errorMessage: constants.user.userDoesNotExist }
			}
			else {
				const fileId = parseImageId(file)
				user.profileImageId = fileId
				await user.save()
				json = { status: constants.status.OK }
			}
			console.log("RESPONSE: ", json);
			res.status(200).json(json);
		}
		catch (err) {
			console.log(err)
			res.status(500).send()
		}
	})
}

writeReview = async (req, res) => {
	console.log("writeReview", req.body);
	const userId = req.userId;
	const { stars, comment, productId } = req.body;

	let json = {};
	let user = null;
	let product = null;
	try {
		if (!userId) {
			throw constants.error.didNotGetUserId
		}
		else if (!(user = await User.findById(userId))) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.userDoesNotExist };
		}
		else if (!stars || !productId) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField };
		}
		else if (!(product = await Product.findById(productId))) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.productDoesNotExist };
		}
		else if (product.state !== ProductState.SOLD) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.productIsNotSold };
		}
		else if (product.buyerUsername !== user.username) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.userDidNotPurchaseThisProduct };
		}
		else if (product.reviewId) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.reviewAlreadyExists };
		}
		else if(stars<1 || stars>5){
			json = { status: constants.status.ERROR, errorMessage: constants.review.starsNotInRange };
		}
		else {
			const review = new Review({
				forUsername: product.sellerUsername,
				byUsername: product.buyerUsername,
				stars: stars,
				comment: comment
			});
			await review.save();
			product.reviewId = review._id;
			await product.save();
			json = { "status": constants.status.OK};
		}
		console.log("RESPONSE: ", json);
		res.status(200).json(json);
	}
	catch (err) {
		console.log(err);
		res.status(500).send({status: constants.status.FATAL_ERROR});
	}
}

module.exports = {
	getProfileByUsername,
	getAccount,
	updateAccount,
	updateProfileImage,
	writeReview,
}