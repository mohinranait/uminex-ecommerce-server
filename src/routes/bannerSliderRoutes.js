const { createNewSlider, getAllBannerSliders, updateBannerSliderById, deleteBannerSliderById, getBannerSliderById } = require("../controllers/BannerSliderControllers");
const isAdmin = require("../middleware/isAdmin");
const isAuth = require("../middleware/isAuth");

const bannerSliderRouter = require("express").Router();


bannerSliderRouter.post("/create-banners", isAuth, isAdmin, createNewSlider);
bannerSliderRouter.get("/all-banners", getAllBannerSliders);
bannerSliderRouter.get("/banner/:id",isAuth, isAdmin, getBannerSliderById);
bannerSliderRouter.patch("/update-banners/:id", isAuth, isAdmin, updateBannerSliderById);
bannerSliderRouter.delete("/delete-banners/:id", isAuth, isAdmin, deleteBannerSliderById);


module.exports = bannerSliderRouter;