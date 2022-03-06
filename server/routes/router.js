// Imports
const express = require('express');
const auth = require('../auth');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const walletController = require('../controllers/walletController');
const productController = require('../controllers/authController');
const purchaseController = require('../controllers/purchaseController')

// Router
const router = express.Router()

// Register
router.post('/auth/register', authController.register)
// Login
router.post('/auth/login', authController.login)
// Logout
router.post('/auth/logout', authController.logout)

// Get Profile
router.get('/user/getProfileByUsername/:username', userController.getProfileByUsername)
// Get Account
router.get('/user/getAccount', auth.verify, userController.getAccount)
// Update Your Account
router.put('/user/updateAccount', auth.verify, userController.updateAccount)
// Update Profile Image
router.put('/user/updateProfileImage', auth.verify, userController.updateProfileImage)
// Write Review
router.post('/user/writeReview', auth.verify,  userController.writeReview)

// Get Wallets
router.get('/wallet/getWallets', auth.verify, walletController.getWallets)
// Add Wallets
router.post('/wallet/addWallet', auth.verify, walletController.addWallet)
// Remove Wallet
router.post('/wallet/removeWallet', auth.verify, walletController.removeWallet)

// Get Catalog
router.post('/product/getCatalog', productController.getCatalog)
// Get Product
router.get('/product/getProduct/:id', productController.getProduct)
// Get Products For User's Personal Lists
router.get('/product/getProductsForUser', auth.verify, productController.getProductsForUser)
// Sell Product
router.post('/product/sellProduct', auth.verify, productController.sellProduct)

// Add Product to Cart
router.post('/purchase/addToCart', auth.verify, purchaseController.addToCart)
// Purchase Products
router.post('/purchase/purchaseFromCart', auth.verify, purchaseController.purchaseFromCart)

module.exports = router