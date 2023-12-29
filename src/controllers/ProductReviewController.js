const ProductReview = require("../models/ProductReview");
const Product = require("../models/ProductModel");

// Create prdouct review 
const createProductReview = async  (req, res) => {
    try {
        const email = req.query?.email
        const productId = req.body?.product;
        const tokenEmail = req.user?.email;
        const body = req.body;
        if(tokenEmail !== email){
            return res.status(401).send({
                message : "forbidden access",
                success: false,
            })
        }

        // Existing reviews checked
        const query = {
            user : body?.user,
            product : body?.product,
        }
        const isExists = await ProductReview.findOne(query);
        if(isExists){
            return res.send({
                success: 'isExists',
                message : "Review already exists",
            })
        }

        // Create new product rating OR reviews
        await ProductReview.create(body);

        // Update product reviews by product ID
        const reviews = await ProductReview.find({product: productId})
        const totalReviews = await ProductReview.find({product: productId}).countDocuments();
        const avg = reviews?.reduce((acc , cur) => acc + cur.rating,0)
        const rating = avg / totalReviews;
        // Update product rating
        await Product.findByIdAndUpdate(productId , {
            rating,
            reviews : totalReviews,
        }, {
            new : true,
            runValidators: true,
        })
        
        res.send({
            success : true,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}


// product wish get all reviews 
const getAllProductReviews = async (req, res) => {
    try {
        const productId = req.params?.product_id;
        const reviews = await ProductReview.find({product: productId});
        res.send({
            reviews,
        })
    } catch (error) {
        
    }
}


module.exports = {
    createProductReview,
    getAllProductReviews
}