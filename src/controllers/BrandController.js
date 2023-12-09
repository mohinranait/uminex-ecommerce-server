const Brand = require("../models/BrandModel");


// Create new brand method
const createNewBrand = async (req, res) => {
    try {
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }
        const brand = await Brand.create(req.body);
        res.send({
            success: true,
            brand
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}

// Get all brands
const getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find({});
        res.send({
            success: true,
            brands
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}

// Get single brand
const getSingleBrand = async (req, res) => {
    try {
        const id = req.params?.id;
        const brand = await Brand.findById(id);
        if(!brand){
            return res.status(404).send({
                message : "Notfound",
                success: false,
            })
        }
        
        res.send({
            success: true,
            brand
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}

// update single brand by id
const updateSingleBrand = async (req, res) => {
    try { 
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }

        const id = req.params?.id;
        const brand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })

        if( !brand ){
            return res.status(404).send({
                message : "Notfound",
                success: false,
            })
        }

        res.send({
            success: true,
            brand
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}

// Delete single caegory by id
const deleteSingleBrand = async (req, res) => {
    try { 
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }

        const id = req.params?.id;
        const brand = await Brand.findByIdAndDelete(id)

        if( !brand ){
            return res.status(404).send({
                message : "Notfound",
                success: false,
            })
        }

        res.send({
            success: true,
            message: "Delated"
        })
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        })
    }
}



module.exports = {
    createNewBrand,
    getAllBrands,
    getSingleBrand,
    updateSingleBrand,
    deleteSingleBrand
}