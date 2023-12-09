const { productStoreInShoppingCart, getUserWishAllCarts, removeShoppingCarts } = require("../controllers/ShoppingCart");
const isAuth = require("../middleware/isAuth");

const shoppingCartRouter  = require("express").Router();


shoppingCartRouter.post('/carts', isAuth, productStoreInShoppingCart)
shoppingCartRouter.get('/shopping_carts', isAuth, getUserWishAllCarts)
shoppingCartRouter.delete('/remove-shopping-cart/:id', isAuth, removeShoppingCarts)


module.exports = shoppingCartRouter
