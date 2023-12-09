const Product = require("../models/ProductModel");


// Get all products
const getAllProducts = async (req, res) => {
    try {
        const search = req.query?.search || '';
        const limit = Number(req.query?.limit) || 5;
        const page = Number(req.query?.page) || 1;

        // Search product by name, slug
        const searchRegExp = new RegExp(".*"+search+".*", 'i');
        const filter = {
            status : { $ne : false },
            $or : [
                // Multiple condition wish search product
                {name: { $regex : searchRegExp}},
                {slug: { $regex : searchRegExp}},
            ]
        }

        const products = await Product.find(filter).populate('brand').populate('category').skip((page-1)*limit).limit(limit);
        const counts = await Product.find(filter).countDocuments();
        res.status(200).send({
            success: true,
            products,
            pagination : {
                totalPages: Math.ceil( counts / limit ) ,
                currentPage:page ,
                previus : page - 1 > 0 ? page - 1 : null ,
                next : page + 1 <= Math.ceil(counts / limit) ? page + 1 : null,
            }
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}

// get single product by id
const getSingleProductById = async (req, res) => {
    try {
        const id = req.params?.id;
        const product = await Product.findById(id).populate('brand').populate('category')
        if(!product){
            return res.status(404).send({
                success: false,
                message: "Notfound",
            })
        }
      
        res.status(200).send({
            success: false,
            product,
        })
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}

// get single product by unique slug
const getSingleProductBySlug = async (req, res) => {
    try {
        const slug = req.params?.slug;
        const product = await Product.findOne({slug}).populate('brand').populate('category').populate('author')
        console.log(product);
        if(!product){
            return res.status(404).send({
                success: false,
                message: "Notfound",
            })
        }
        res.status(200).send({
            success: true,
            product,
        })
        
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}

// Create new product
const createNewProducts = async (req, res) => {
    try {
        // console.log(req.body);
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }

        const body = req.body;
        const product = await Product.create(body);
        res.status(201).send({
            success: true,
            message: "Product Created",
            // product,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : 'error.message'
        })
    }
} 

// update product by ID
const updateProductById = async (req, res) => {
    try {
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }

        const id = req.params?.id;
        const body = req.body;
        const product = await Product.findByIdAndUpdate(id, body, {
            new :true,
            runValidators:true,
        })
        if(!product){
            return res.status(404).send({
                success: false,
                message: "Notfound",
            })
        }
        res.status(200).send({
            success: true,
            message : "Product updated",
            product,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
} 


// Delete product by ID
const deleteProductById = async (req, res) => {
    try {
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }
        const id = req.params?.id;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).send({
                success: false,
                message: "Notfound",
            })
        }
        res.status(200).send({
            success: true,
            message : "Product deleted",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
} 


// Unique slug product checked 
const checkSlugForUnique = async (req, res) => {
    try {
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }

        const slug = req.params?.slug;
        const product = await Product.findOne({slug});
        let success = false;
        if(product){
            success = true
        }
        res.status(200).send({
            success,
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}



module.exports = {
    getAllProducts,
    getSingleProductById,
    createNewProducts,
    updateProductById,
    deleteProductById,
    getSingleProductBySlug,
    checkSlugForUnique
}