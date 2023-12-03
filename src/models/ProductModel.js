const {model, Schema} = require("mongoose")

const productSchema = new Schema({
    name: {
        type: String,
    },
    slug: { type: String, lowercase:true},
    price: { type: Number},
    discount: { type: Number},
    discount_type: { type: Number},
    short_description: { type : String},
    publish_date: {
        type : Date,
    },
    images : {
        type: '',
    },
    description: { type : String},
    category: { 
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    brand: { 
        type: Schema.Types.ObjectId,
        ref: "Brand",
    },
})


const Product = model("Product", productSchema);

module.exports = Product;


/**
 * 1. Product images array
 * 2. color and size wish price
*/