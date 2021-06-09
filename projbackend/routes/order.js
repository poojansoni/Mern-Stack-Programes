const express = require('express');
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth"); //admin can add chng category
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const {updateStock } = require("../controllers/product");
const {  } = require("../controllers/order");

module.exports = router;