const BannerSlider = require("../models/BannerSliderModel");

// Create new banner slider
const createNewSlider = async (req, res) => {
    try {
        const isAdmin = req.admin
        if(isAdmin === false){
            return res.status(403).send({
                success: false,
                message : "forbidden access",
            })
        }
        await BannerSlider.create(req.body);
        res.status(200).send({
            success : true,
            message : "Banner created"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message
        })
    }
}


// get all banner slider
const getAllBannerSliders = async (req, res) => {
    try {
        const banners = await BannerSlider.find({}); 
        res.status(200).send({
            success : true,
            banners,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message
        })
    }
}



// get signle banner slider by id
const getBannerSliderById = async (req, res) => {
    try {
        const isAdmin = req.admin
        if(isAdmin === false){
            return res.status(403).send({
                success: false,
                message : "forbidden access",
            })
        }
        const id = req.params?.id
        const banners = await BannerSlider.findById(id); 
        res.status(200).send({
            success : true,
            banners,
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message
        })
    }
}



// Update  banner slider by ID
const updateBannerSliderById = async (req, res) => {
    try {
        const isAdmin = req.admin
        if(isAdmin === false){
            return res.status(403).send({
                success: false,
                message : "forbidden access",
            })
        }

        const id = req.params?.id;
        const banner = await BannerSlider.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })

        if( !banner ){
            return  res.status(404).send({
                success:false,
                message: "Banner notfound"
            })
        }
        res.status(200).send({
            success : true,
            message : "Banner updated"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message
        })
    }
}


// Delete  banner slider by ID
const deleteBannerSliderById = async (req, res) => {
    try {
        const isAdmin = req.admin
        if(isAdmin === false){
            return res.status(403).send({
                success: false,
                message : "forbidden access",
            })
        }

        const id = req.params?.id;
        const banner = await BannerSlider.findByIdAndDelete(id)

        if( !banner ){
            return  res.status(404).send({
                success:false,
                message: "Banner notfound"
            })
        }
        res.status(200).send({
            success : true,
            message : "Banner deleted"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message
        })
    }
}

module.exports = {
    createNewSlider,
    getAllBannerSliders,
    getBannerSliderById,
    updateBannerSliderById,
    deleteBannerSliderById
}


