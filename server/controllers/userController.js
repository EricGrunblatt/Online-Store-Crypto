const { application } = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Product = require('../models/productModel')
const Review = require('../models/reviewModel')
const constants = require('./constants.json')
const Image = require('../models/imageModel')
const fs = require('fs')
const path = require('path')
const { createAndSaveImage, upload } = require('../handlers/imageHandler')
const { json } = require('body-parser')

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
			const profileImage = await Image.findById(user.profileImageId)
				.select({ "_id": 0, "data": 1, "contentType": 1 })
			// GET USER'S SELLING PRODUCTS
			const sellingProducts = await Products.find({ sellerUsername: username, buyerUsername: null })
				.select({ "_id": 1, "name": 1, "price": 1, "sellerUsername": 1, "dateListed": 1 })
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

// TODO
getAccount = async (req, res) => {
	console.log("getAccount", req.body)
	const userId = req.userId
	
	let json = {}
	try {
		if (!userId) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField }
		}

		else if (!(user = await User.findOne({ "_id": userId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField }
		}
		else {
			console.log("id:"+userId);
			json = {
				"status": constants.status.OK,
				"firstName": user.firstName,
				"lastName": user.lastName,
				"city": user.city,
				"zipcode": user.zipcode,
				"addressFirstLine": user.addressFirstLine,
				"addressSecondLine": user.addressSecondLine,
				"phoneNumber": user.phoneNumber
			}
		}
		console.log("RESPONSE: ", json)
		res.status(200).json(json)
	}
	catch (err) {
		console.log(err);
		res.status(500).send(constants.status.FATAL_ERROR);
	}




}

// TODO
updateAccount = async (req, res) => {
	console.log("updateAccount", req.body)
	const userId=req.userId;
	const { email,firstName, lastName, city, state, zipcode,
		oldPassword, newPassword, confirmPassword,
		addressFirstLine, addressSecondLine, phoneNumber } = req.body

	let json = {}
	let user = null
	try {
		if (!userId) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField };
		}

		else if (!(user = await User.findOne({ "_id": userId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField };
		}
		else if(!email ||!userId||!firstName||!lastName||!city||!state||!zipcode||!addressFirstLine||!phoneNumber){
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField };
		}
		else {
			let passwordHash = null;
			if (oldPassword) {
				
				const passwordCorrect = await bcrypt.compare(oldPassword, user.passwordHash);
				console.log(newPassword,user.passwordHash,confirmPassword,passwordCorrect);
				if (!passwordCorrect || newPassword !== confirmPassword) {
					json = { status: constants.status.ERROR, errorMessage: constants.auth.passwordsDoNotMatch };
					console.log("RESPONSE: ", json);
					return res.status(200).json(json);
				}
				const saltRounds = 10;
				const salt = await bcrypt.genSalt(saltRounds);
				passwordHash = await bcrypt.hash(newPassword, salt);
			}
			else {
				passwordHash = user.passwordHash
			}

			user.email=email;
			user.firstName = firstName;
			user.lastName = lastName;
			user.city = city;
			user.zipcode = zipcode;
			user.passwordHash = passwordHash;
			user.addressFirstLine = addressFirstLine;
			user.addressSecondLine = addressSecondLine;
			user.phoneNumber = phoneNumber;

			await user.save();
			json = { "status": constants.status.OK, "userId": userId };
			
		}

		console.log("RESPONSE: ", json);
		res.status(200).json(json)

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
				throw "did not get a userId"
			}
			// CHECK USER EXISTS
			else if (!(user = await User.findById(userId))) {
				json = { status: constants.status.ERROR, errorMessage: constants.user.userDoesNotExist }
			}
			else {
				const fileId = await createAndSaveImage(file, "profileImage for " + user.username);
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

// TODO
writeReview = async (req, res) => {
	console.log("writeReview", req.body);
	const userId = req.userId;
	const { stars, comment, objectId } = req.body;

	let json = {};
	let user = null;
	let product = null;

	try {
		if (!userId) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField };
		}

		else if (!(user = await User.find({ "_id": userId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField };
		}

		else if (!(product = await Product.findOne({ "_id": objectId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.missingRequiredField };
		}
		else if (product.reviewId) {
			json = { status: constants.status.ERROR, errorMessage: constants.product.reviewExist };
		}
		else if(stars<1 || stars>5){
			json = { status: constants.status.ERROR, errorMessage: constants.review.starsNotInRange };
		}
		else {
			const review = new Review({
				"forUsername": product.sellerUsername,
				"byUsername": product.buyerUsername,
				"stars": stars,
				"comment": comment
			});
			console.log("review:",review._id);
			await review.save();
			product.reviewId=review._id;
			await product.save();
			
			json = { "status": constants.status.OK};
	}
	console.log("RESPONSE: ", json);
	res.status(200).json(json);

}
	
	catch (err) {
		console.log(err);
		res.status(500).send();
	}

}

module.exports = {
	getProfileByUsername,
	getAccount,
	updateAccount,
	updateProfileImage,
	writeReview,
}