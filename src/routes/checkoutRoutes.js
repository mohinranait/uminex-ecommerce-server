const { createNewOrders } = require("../controllers/CheckoutController");

const checkoutRoute = require("express").Router();

checkoutRoute.post(`/checkout`, createNewOrders );


module.exports = checkoutRoute;