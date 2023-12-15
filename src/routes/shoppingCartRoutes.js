const { productStoreInShoppingCart, getUserWishAllCarts, removeShoppingCarts, udpateShoppingCarts } = require("../controllers/ShoppingCart");
const isAuth = require("../middleware/isAuth");

const shoppingCartRouter  = require("express").Router();


shoppingCartRouter.post('/carts', isAuth, productStoreInShoppingCart)
shoppingCartRouter.get('/shopping_carts', isAuth, getUserWishAllCarts)
shoppingCartRouter.patch('/shopping_update/:id', isAuth, udpateShoppingCarts)
shoppingCartRouter.delete('/remove-shopping-cart/:id', isAuth, removeShoppingCarts)


module.exports = shoppingCartRouter
