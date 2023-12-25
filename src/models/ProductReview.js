const {model, Schema, Types } = require("mongoose")

const productReviewSchema = new Schema({
    user : {
        type  : Types.ObjectId,
        ref: "User"
    },
    product : {
        type  : Types.ObjectId,
        ref: "Product"
    },
    reviewText : {
        type : String,
    },
    rating : {
        type : Number,
    },
    
   
},{timestamps:true});



const ProductReview = model("ProductReview", productReviewSchema);

module.exports = ProductReview;