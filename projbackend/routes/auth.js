var express = require('express');
var router = express.Router();

//using controller
var {signout, signup} = require("../controllers/auth");

//setting route
router.get("/signout", signout);

router.post("/signup",signup)

module.exports = router;