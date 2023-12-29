const  express =require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validatereview, isloggedIn, isReviewAuthor} = require("../middleware.js");
const review = require("../models/review.js");

const reviewController = require("../controllers/reviews.js");

 //reviews POST Route
 router.post(
    "/", 
    // listings/:id/reviews
    isloggedIn,
    validatereview, 
    wrapAsync(reviewController.createReview));

//reviews delete Route
router.delete("/:reviewId", 
isloggedIn,
isReviewAuthor,
wrapAsync(reviewController.destroyReview));

module.exports = router;