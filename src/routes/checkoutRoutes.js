const { createNewOrders, stripePaymentAndOrder, stripePaymentIntentCreate } = require("../controllers/CheckoutController");
const isAuth = require("../middleware/isAuth");

const checkoutRoute = require("express").Router();

checkoutRoute.post(`/checkout-cash-on-delivery`, isAuth, createNewOrders );
checkoutRoute.post('/success', isAuth, stripePaymentAndOrder )
checkoutRoute.post('/create-checkout-session', stripePaymentIntentCreate )



module.exports = checkoutRoute;