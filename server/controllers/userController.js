const { application } = require('express')
const User = require('../models/userModel')
const constants = require('./constants.json')
const Image = require('../models/imageModel')
const fs = require('fs')
const path = require('path')
const { createAndSaveImage } = require('../handlers/imageHandler')

// TODO
getProfileByUsername = async (req, res) => {
	console.log("getProfile", req.body)
	const {username} = req.body
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

// TODO
updateProfileImage = async (req, res) => {
	// NOTE: data must be sent in form-data format with the image value at key value "image"
	console.log("updateProfileImage", req.body)
	
	// REQUEST DATA
	const userId = req.userId
	const file = req.file

	let json = {}
	try {
		if (!file) {
			json = {status: constants.status.ERROR, errorMessage: constants.user.missingRequiredField}
		}
		else {
			const fileId = await createAndSaveImage(file, "test")
			const user = await User.findById(userId)
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