const { createNewProducts, getAllProducts, getSingleProductById, updateProductById, deleteProductById, getSingleProductBySlug, checkSlugForUnique } = require("../controllers/ProductControllers");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");

const productRoute  = require("express").Router();


productRoute.post('/products', isAuth, isAdmin , createNewProducts)
productRoute.get('/products', getAllProducts);
productRoute.get('/products/:id', getSingleProductById);
productRoute.get('/product-by-slug/:slug', getSingleProductBySlug);
productRoute.patch('/products/:id', isAuth, isAdmin, updateProductById);
productRoute.delete('/products/:id', isAuth, isAdmin, deleteProductById);
productRoute.get('/uniquer-slug/:slug', isAuth, isAdmin, checkSlugForUnique);



module.exports = productRoute;