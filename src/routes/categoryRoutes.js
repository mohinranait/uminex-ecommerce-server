const categoryRoutes = require("express").Router();
const { createNewCategory, getAllCategorys, getSingleCategory,getSingleCategoryBySlug, updateSingleCategory, deleteSingleCategory } = require("../controllers/CategoryControllers");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");


categoryRoutes.post("/create-categorys", isAuth, isAdmin, createNewCategory)
categoryRoutes.get("/all-categorys", getAllCategorys)
categoryRoutes.get("/category/:id", getSingleCategory)
categoryRoutes.get("/category-slug/:slug", getSingleCategoryBySlug)
categoryRoutes.patch("/update-category/:id", isAuth, isAdmin, updateSingleCategory)
categoryRoutes.delete("/delete-category/:id", isAuth, isAdmin, deleteSingleCategory)

module.exports = categoryRoutes;