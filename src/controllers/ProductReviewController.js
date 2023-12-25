const ProductReview = require("../models/ProductReview");

// Create prdouct review 
const createProductReview = async  (req, res) => {
    try {
        const email = req.query?.email
        const tokenEmail = req.user?.email;
        const body = req.body;
        if(tokenEmail !== email){
            return res.status(401).send({
                message : "forbidden access",
                success: false,
            })
        }

        // const query = {
        //     user : body?.user,
        //     product : body?.product,
        // }
        // const isExists = await ProductReview.findOne(query);

        // if(isExists){
        //     return res.send({
        //         success: 'isExists',
        //         message : "Review already exists",
        //     })
        // }

       
        await ProductReview.create(body);
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
        const prdouctId = req.params?.product_id;
        const reviews = await ProductReview.find({product: prdouctId});
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