const express = require('express');
const router = express.Router();

                           //, getAllUsers    
const { getUserById, getUser                } = require("../controllers/user");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");

router.param('userId', getUserById);
router.get('/user/:userId', isSignedIn, isAuthenticated, getUser)

// router.get('/users', getAllUsers)

module.exports = router;