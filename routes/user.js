const  express =require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const usercontroller = require("../controllers/users.js");

router.route("/signup")
//signup page
.get(usercontroller.rendersignUpForm)
//signup
.post(wrapAsync(usercontroller.signUp)
);

router.route("/login")
//login page
.get(usercontroller.renderLoginForm)
//log in
.post(
saveRedirectUrl,
passport.authenticate("local",{
 failureRedirect:'/login', 
 failureFlash:true
}),usercontroller.login
);

//log out
router.get("/logout",usercontroller.logout);

module.exports = router;