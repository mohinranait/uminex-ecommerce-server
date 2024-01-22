const Product = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const Brand = require("../models/BrandModel");
const Color = require("../models/ColorModel");

// Get all products
const getAllProducts = async (req, res) => {
    try {
        
        const search = req.query?.search || '';
        const access = req.query?.access || ''; // user || admin
        const status = req.query?.status || ''; // product status [active, pending] 
        const limit = Number(req.query?.limit) || 20;
        const page = Number(req.query?.page) || 1;
        let sorting = req.query?.sort; // asc, desc
        const sortFiled = req.query?.sortFiled;
        const request = req.query?.request; // topSell, features, offers
        // formate sorting order
        if(sorting === 'asc'){
            sorting = 1;
        }else{
            sorting = -1
        }

        // Search product by name, slug
        const searchRegExp = new RegExp(".*"+search+".*", 'i');
        const filter = {}

        // Product Status 
        if(access === 'user'){
            filter.status = { $eq : 'active' }
        }else{
            if(status !== 'null'){
                filter.status = { $eq : status }
            }
        }

        // Search 
        if( search !== 'null'  ){
            filter.$or = [
                {name: {$regex : searchRegExp}},
                {slug: {$regex : searchRegExp}},
                {product_type: {$regex : searchRegExp}},
                {skuCode: {$regex : searchRegExp}},
            ]
        }
        // features product
        if(request){
            if(request === 'isFeature'){
                filter.isFeature = 'active'
            }else if(request === 'Offers'){
                filter['price.discountPrice'] = { $gt : 0}
            }
        }

      


        const products = await Product.find(filter)
        .populate('brand')
        .populate('category')
        .skip((page-1)*limit)
        .limit(limit)
        .sort({[sortFiled]: sorting });
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
        // console.log(product);
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


// Category wish product 
const getCategoryWishProduct = async (req, res) => {
    try {
        
        const categorySlug = req.params?.slug;
        const { brand: brandSlug, color: colorSlug, delivery,limit,page,sort,sortFiled, offers,priceRange } = req.query;
        
        // Find the category based on the provided category slug
        const category = await Category.findOne({ slug: categorySlug });

        // Find the brand based on the provided brand slug
        const brand = brandSlug ? await Brand.findOne({ slug: brandSlug }) : null;

        // Find the color based on the provided color slug
        const color = colorSlug ? await Color.findOne({ slug: colorSlug }) : null;

        // Search by product name
        const search = req.query?.search || '';
        const searchRegExp = new RegExp(".*"+ search+".*", 'i');

        let query = {
            status : {$ne : 'pending'},
        };
        if( search !== 'null'  ){
            query.$or = [
                {name: {$regex : searchRegExp}},
                {slug: {$regex : searchRegExp}},
                {product_type: {$regex : searchRegExp}},
                {skuCode: {$regex : searchRegExp}},
            ]
        }

        // offers product 
        if(offers === 'true'){
            query['price.discountPrice'] = { $gt : 0}
        }
        // product price with filter
        if(priceRange){
            const [min,max]=priceRange.split('-');
            const minPrice = Number(min)
            const maxPrice = Number(max)
            query['price.sellingPrice'] = { $gt : minPrice , $lt : maxPrice }
        }
        if(category){
            query.category = category?._id
        }
        if(brand){
            query.brand = brand?._id;
        }
        if(color){
            query['colors.slug']  = color?.slug
        }

        if(delivery ==='free'){
            query['delivery.deliveryStatus']  = delivery
        }
        
        
        // Find products based on the constructed query
        const products = await Product.find(query)
        .skip((page-1)*limit)
        .sort({[sortFiled]: sort == 'asc' ? 1 : -1})
        .limit(limit)
        .populate('category')

        const totalProducts = await Product.find(query).countDocuments();
        res.send({
            products,
            totalProducts,
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
    checkSlugForUnique,
    getCategoryWishProduct
}