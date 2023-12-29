const { getAllOrders, updateOrdersById, deleteOrdersById } = require("../controllers/OrdersController");
const isAuth = require("../middleware/isAuth")
const isAdmin = require("../middleware/isAdmin")
const orderRoutes = require("express").Router();

orderRoutes.get('/get-all-orders', isAuth,  getAllOrders )
orderRoutes.patch('/udpate-order/:id', isAuth,  updateOrdersById )
orderRoutes.delete('/delete-order/:id', isAuth, isAdmin,  deleteOrdersById )

module.exports = orderRoutes