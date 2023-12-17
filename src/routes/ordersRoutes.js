const { getAllOrders, updateOrdersById } = require("../controllers/OrdersController");
const isAuth = require("../middleware/isAuth")
const orderRoutes = require("express").Router();

orderRoutes.get('/get-all-orders', isAuth,  getAllOrders )
orderRoutes.patch('/udpate-order/:id', isAuth,  updateOrdersById )

module.exports = orderRoutes