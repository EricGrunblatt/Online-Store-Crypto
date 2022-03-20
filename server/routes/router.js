// Imports
const express = require('express');
const auth = require('../auth');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
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
router.post('/user/getProfileByUsername/:username', userController.getProfileByUsername)
// Get Account
router.post('/user/getAccount', auth.verify, userController.getAccount)
// Update Your Account
router.post('/user/updateAccount', auth.verify, userController.updateAccount)
// Update Profile Image
router.post('/user/updateProfileImage', auth.verify, userController.updateProfileImage)
// Write Review
router.post('/user/writeReview', auth.verify,  userController.writeReview)

// Get Catalog
router.post('/product/getCatalog', productController.getCatalog)
// Get Product
router.post('/product/getProduct', productController.getProduct)
// Get Products For User's Personal Lists
router.post('/product/getProductsForUser', auth.verify, productController.getProductsForUser)
// Sell Product
router.post('/product/sellProduct', auth.verify, productController.sellProduct)

// Add Product to Cart
router.post('/purchase/addToCart', auth.verify, purchaseController.addToCart)
// Purchase Products
router.post('/purchase/purchaseFromCart', auth.verify, purchaseController.purchaseFromCart)

module.exports = router