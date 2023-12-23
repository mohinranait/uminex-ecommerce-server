const { createNewWishlist, getAllWishlistForUser, deleteWishlistById } = require("../controllers/WishlistController");

const wishlistRouter = require("express").Router();


wishlistRouter.post('/wishlist/:email', isAuth , createNewWishlist)
wishlistRouter.get('/all-wishlists/:user_id', isAuth , getAllWishlistForUser)
wishlistRouter.delete('/address/:id', isAuth , deleteWishlistById)

module.exports = wishlistRouter;

