var express = require("express");
const { check } = require("express-validator");
var router = express.Router();

//using controller
var { signout, signup, signin, isSignedIn } = require("../controllers/auth");

//setting route
router.get("/signout", signout);

router.post(
	"/signup",
	[
		//setting Validations for fields that are passed
		check("name")
			.isLength({ min: 3 })
			.withMessage("Name should be atleast 3 chars"),
		check("email").isEmail().withMessage("Email is required/Enter Valid email"),
		check("password")
			.isLength({ min: 5 })
			.withMessage("Password should be atleast 5 chars"),
	],
	signup,
);

router.post(
	"/signin",
	[
		//setting Validations for fields that are passed
		check("email").isEmail().withMessage("Email is required/Enter Valid email"),
		check("password")
			.isLength({ min: 5 })
			.withMessage("Password Required (*5)"),
	],
	signin,
);

// router.get("/testroute", isSignedIn,(req,res)=>{
//     res.json(req.auth);
// });

module.exports = router;
