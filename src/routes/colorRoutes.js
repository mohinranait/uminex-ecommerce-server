const { createColor, getSingleColorBySlug, getSingleColorById, getAllColors } = require("../controllers/ColorController");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");

const colorRoutes = require("express").Router();


colorRoutes.post("/color", isAuth, isAdmin, createColor);
colorRoutes.get("/colors/", getAllColors);
colorRoutes.get("/colors/:slug", getSingleColorBySlug);
colorRoutes.get("/color/:id", getSingleColorById);

module.exports = colorRoutes