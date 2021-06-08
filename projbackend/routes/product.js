const express = require('express');
const router = express.Router();

const { getProductById , createProduct, getProduct, getAllProducts, updateProduct, removeProduct} = require("../controllers/product");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth"); //admin can add chng category
const { getUserById } = require("../controllers/user");

//params
router.param('userId', getUserById);
router.param('productId', getProductById);

//routes
//router.post('/product/create/:productId',isSignedIn, isAuthenticated, isAdmin, createProduct);
router.get('/product/:productId', getProduct);
//router.get('/products', getAllProducts);
//router.put('/product/:productId/:userId',isSignedIn, isAuthenticated, isAdmin, updateProduct);
//router.delete('/product/:productId/:userId',isSignedIn, isAuthenticated, isAdmin, removeProduct);

module.exports = router;