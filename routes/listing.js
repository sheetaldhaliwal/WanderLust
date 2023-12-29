const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isloggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });


// Index route
router.route("/")
.get(wrapAsync(listingController.index))
// create route
.post(
   isloggedIn, 
   upload.single('listing[image]'),
   validateListing,
   wrapAsync(listingController.createlisting));


   //New Route
router.get("/new", isloggedIn,listingController.renderNewForm);


   //show routes
router.route("/:id")
.get(wrapAsync(listingController.showlisting))
  //update
.put(
   isloggedIn,
   isOwner,
   upload.single('listing[image]'), 
   validateListing,
   wrapAsync(listingController.updatelisting))
   //delete route
.delete(isloggedIn,isOwner, 
  wrapAsync(listingController.destroylisting));

 //Edit Route
  router.get("/:id/edit", isloggedIn,isOwner, 
  wrapAsync(listingController.renderEditForm));


 
  module.exports = router;
  module.exports = router;