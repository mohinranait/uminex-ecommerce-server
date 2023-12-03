const { createNewCategory, getAllCategorys, getSingleCategory, updateSingleCategory, deleteSingleCategory } = require("../controllers/CategoryControllers");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");

const categoryRoutes = require("express").Router();

categoryRoutes.post("/create-categorys", isAuth, isAdmin, createNewCategory)
categoryRoutes.get("/all-categorys", getAllCategorys)
categoryRoutes.get("/category/:id", getSingleCategory)
categoryRoutes.patch("/update-category/:id", isAuth, isAdmin, updateSingleCategory)
categoryRoutes.delete("/delete-category/:id", isAuth, isAdmin, deleteSingleCategory)

module.exports = categoryRoutes;