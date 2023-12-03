const Category = require("../models/CategoryModel")

// Create new category
const createNewCategory = async (req, res) => {
    try {
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }

        const category = await Category.create(req.body);
        res.send({
            success: true,
            category
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}

// Get all caegorys
const getAllCategorys = async (req, res) => {
    try {
        const categorys = await Category.find({});
        res.send({
            success: true,
            categorys
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}

// Get single caegory
const getSingleCategory = async (req, res) => {
    try {
        const id = req.params?.id;
        const category = await Category.findById(id);
        res.send({
            success: true,
            category
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}

// update single caegory by id
const updateSingleCategory = async (req, res) => {
    try { 
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }

        const id = req.params?.id;
        const category = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        })

        if( !category ){
            return res.status(401).send({
                message : "unauthorize access",
                success: false,
            })
        }

        res.send({
            success: true,
            category
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}

// delete single caegory by id
const deleteSingleCategory = async (req, res) => {
    try { 
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }

        const id = req.params?.id;
        const category = await Category.findByIdAndDelete(id)

        if( !category ){
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
    getAllCategorys,
    getSingleCategory,
    createNewCategory,
    updateSingleCategory,
    deleteSingleCategory
}