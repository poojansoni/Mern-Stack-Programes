const express = require('express');
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth"); //admin can add chng category
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const {updateStock } = require("../controllers/product");
const { getOrderById, createOrder , getAllOrders, updateStatus, getOrderStatus } = require("../controllers/order");


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

router.get("/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders);

//order-status routes
router.get("/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus);

router.put('/order/:orderId/status/:userId',
    isSignedIn, 
    isAuthenticated,
    isAdmin,
    updateStatus);


module.exports = router;