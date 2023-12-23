const { createColor, getSingleColorBySlug, getSingleColorById, getAllColors, updateColorById } = require("../controllers/ColorController");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");

const colorRoutes = require("express").Router();


colorRoutes.post("/color", isAuth, isAdmin, createColor);
colorRoutes.get("/colors/", getAllColors);
colorRoutes.get("/colors/:slug", getSingleColorBySlug);
colorRoutes.get("/color/:id", getSingleColorById);
colorRoutes.patch("/color/:id", isAuth, isAdmin, updateColorById);

module.exports = colorRoutes