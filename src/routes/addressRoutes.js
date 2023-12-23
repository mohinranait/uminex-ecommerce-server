const { createNewAddress, getAllAddress, getSingleAddress, updateAddressById } = require("../controllers/AddressController");
const isAuth = require("../middleware/isAuth");

const addressRouter = require("express").Router();


addressRouter.post('/address', isAuth , createNewAddress)
addressRouter.get('/address/:user_id', isAuth , getAllAddress)
addressRouter.get('/addres/:id', isAuth , getSingleAddress)
addressRouter.patch('/address/:id', isAuth , updateAddressById)

module.exports = addressRouter;

