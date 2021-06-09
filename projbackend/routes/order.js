const express = require('express');
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth"); //admin can add chng category
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const {updateStock } = require("../controllers/product");
const { getOrderById, createOrder , getAllOrders } = require("../controllers/order");


//params
router.param('userId', getUserById);
router.param('productId', getProductById);
router.param('orderId', getOrderById);

//Routes
router.post('/order/create/:userId',
 isSignedIn, 
 isAuthenticated,
 pushOrderInPurchaseList,
 updateStock, 
 createOrder);

 router.get("/order/all/:userId", isSignedIn, isAuthenticated, isAdmin, getAllOrders)

module.exports = router;