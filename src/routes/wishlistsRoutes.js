const { createNewWishlist, getAllWishlistForUser, deleteWishlistById } = require("../controllers/WishlistController");

const wishlistRouter = require("express").Router();


wishlistRouter.post('/wishlist/:email', isAuth , createNewWishlist)
wishlistRouter.get('/all-wishlists/:user_id', isAuth , getAllWishlistForUser)
wishlistRouter.delete('/remove-product-for-wishlist', isAuth , deleteWishlistById)

module.exports = wishlistRouter;

