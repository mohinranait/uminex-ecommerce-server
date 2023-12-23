const brandRouter = require("express").Router();
const { createNewBrand, getAllBrands, getSingleBrand, updateSingleBrand, deleteSingleBrand } = require("../controllers/BrandController");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");


brandRouter.post('/create-brand', isAuth, isAdmin, createNewBrand)
brandRouter.get('/all-brands', getAllBrands)
brandRouter.get('/single-brand/:id', getSingleBrand)
brandRouter.patch('/update-brand/:id', isAuth, isAdmin, updateSingleBrand)
brandRouter.delete('/delete-brand/:id', isAuth, isAdmin, deleteSingleBrand)

module.exports = brandRouter