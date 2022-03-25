// Imports
const express = require('express');
const auth = require('../auth');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const purchaseController = require('../controllers/purchaseController');
const walletController = require('../controllers/walletController')

const {upload} = require('../handlers/imageHandler')

// Router
const router = express.Router()

// Register
router.post('/auth/register', authController.register)
// Login
router.post('/auth/login', authController.login)
// Logout
router.post('/auth/logout', authController.logout)

// Get Profile
router.post('/user/getProfileByUsername', userController.getProfileByUsername)
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
// Get Ordererd Products For User
router.post('/product/getOrderedProductsForUser', auth.verify, productController.getOrderedProductsForUser)
// Get Cart Products For User
router.post('/product/getCartProductsForUser', auth.verify, productController.getCartProductsForUser)
// Get Listing Products For User
router.post('/product/getListingProductsForUser', auth.verify, productController.getListingProductsForUser)
// Get Selling Products For User
router.post('/product/getSellingProductsForUser', auth.verify, productController.getSellingProductsForUser)
// Add Listing Product
router.post('/product/addListingProduct', auth.verify, productController.addListingProduct)
// Update Listing Product
router.post('/product/updateListingProduct', auth.verify, productController.updateListingProduct)
// Delete Listing Product
router.post('/product/deleteListingProduct', auth.verify, productController.deleteListingProduct)

// Add Product to Cart
router.post('/purchase/addToCart', auth.verify, purchaseController.addToCart)
// Remove Product From Cart
router.post('/purchase/removeFromCart', auth.verify, purchaseController.removeFromCart)
// Purchase Products
router.post('/purchase/purchaseFromCart', auth.verify, purchaseController.purchaseFromCart)

// Get Wallets
router.post('/wallet/getWallets', auth.verify, walletController.getWallets)
// Add Wallet
router.post('/wallet/addWallet', auth.verify, walletController.addWallet)
// Remove Wallet
router.post('/wallet/removeWallet', auth.verify, walletController.removeWallet)

module.exports = router