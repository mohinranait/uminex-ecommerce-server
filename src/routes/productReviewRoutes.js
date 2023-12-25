const reviewRouter = require("express").Router();
const { createProductReview, getAllProductReviews } = require("../controllers/ProductReviewController");
const isAuth = require("../middleware/isAuth")

reviewRouter.post('/reviews', isAuth , createProductReview)
reviewRouter.get('/reviews/:product_id', getAllProductReviews)

module.exports = reviewRouter