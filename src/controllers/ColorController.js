const Color = require("../models/ColorModel");

// Create new color
const createColor = async (req, res) => {
    try {
        const isAdmin = req.admin;
        if(isAdmin !== 'admin'){
            res.status(401).send({
                message : "unauthorize access",
                success: false,
            })
        }
        const color = req.body;
        await Color.create(color);
        res.send({
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}


// get all colors 
const getAllColors = async (req, res) => {
    try {
        const colors = await Color.find({});
        res.send({
            colors,
            success : true
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}


// get all colors by Slug
const getSingleColorBySlug = async (req, res) => {
    try {
        const slug = req.query?.slug
        const color = await Color.findOne({slug});
        if(!color){
            return res.status(404).send({
                message: "Notfound",
                success: false
            })
        }
        res.send({
            color,
            success : true
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}

// get all colors by ID
const getSingleColorById = async (req, res) => {
    try {
        const id = req.query?.id
        const color = await Color.findOne(id);
        if(!color){
            return res.status(404).send({
                message: "Notfound",
                success: false
            })
        }
        res.send({
            color,
            success : true
        })
    } catch (error) {
        res.status(500).send({
            message : error.message,
            success: false,
        })
    }
}


module.exports = {
    createColor,
    getAllColors,
    getSingleColorBySlug,
    getSingleColorById,
}