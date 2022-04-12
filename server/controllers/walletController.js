const User = require('../models/userModel')
const constants = require('./constants.json')
const { json } = require('body-parser')
const ObjectID = require('mongodb').ObjectID;

//TODO
getWallets = async (req, res) => {
	console.log("getWallets", req.body);
	const userId = req.userId;
	let json = {};
	let user = null;

	try {
		if (!userId) {
			throw "did not get a userId"
		}

		else if (!(user = await User.findOne({ "_id": userId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.wallet.userDoesNotExist }
		}
		else {
			json = {
				status: constants.status.OK,
				wallets: user.wallets
			}
		}
		console.log("RESPONSE: ", json)
		res.status(200).json(json).send();
	}
	catch (err) {
		console.log(err);
		res.status(500).send(constants.status.FATAL_ERROR);
	}

}

//TODO
addWallet = async (req, res) => {
	console.log("addWallet", req.body)
	const userId = req.userId
	const { name, type, address } = req.body;
	let json = {};
	let user = null;

	try {
		if (!userId) {
			throw "did not get a userId"
		}

		else if (!(user = await User.findOne({ "_id": userId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.wallet.userDoesNotExist };
		}
		else if (!name || !type || !address) {
			json = { status: constants.status.ERROR, errorMessage: constants.wallet.missingRequiredField };
		}
		else {
			wallet = {
				"_id":new ObjectID(),
				"name": name,
				"type": type,
				"address": address
			}
			user.wallets.push(wallet);
			user.save();
			json = {
				status: constants.status.OK,
			}
		}
		console.log("RESPONSE: ", json)
		res.status(200).json(json).send();
	}
	catch (err) {
		console.log(err);
		res.status(500).send(constants.status.FATAL_ERROR);
	}

}

//TODO
removeWallet = async (req, res) => {
	console.log("removeWallet", req.body)
	const userId = req.userId
	const {walletId}=req.body;

	let json = {};
	let user = null;

	try {
		if (!userId) {
			throw "did not get a userId"
		}

		else if (!(user = await User.findOne({ "_id": userId }))) {
			json = { status: constants.status.ERROR, errorMessage: constants.wallet.userDoesNotExist }
		}
		else if (!walletId) {
			json = { status: constants.status.ERROR, errorMessage: constants.wallet.missingRequiredField };
		}
		else {
			wallets=user.wallets
			for (let i=0;i<wallets.length;i++){
				if (wallets[i]._id==walletId){
					wallets.splice(i,1);
					break;
				}
			}
			user.wallets=wallets;
			user.save();
			json = {
				status: constants.status.OK,
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

module.exports = {
	getWallets,
	addWallet,
	removeWallet
}