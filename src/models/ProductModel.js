const {model, Schema, Types} = require("mongoose")

const productSchema = new Schema({
    author : {
        type  : Types.ObjectId,
        ref: "User"
    },
    brand : {
        type : Types.ObjectId,
        ref: "Brand",
    },
    category : {
        type : Types.ObjectId,
        ref: "Category",
    },
    colors : [
        {
            label: {type:String},
            value: {type:String},
        }
    ],
    details: { type : String},
    isStock: { 
        type: Number,
        default: 10,
    },
    minStock: { 
        type: Number,
        default: 5
    },
    media : {
        images : [String],
        videoUrl : {type:String}
    },
    name: {
        type: String,
        trim:true,
        required: true,
    },
    product_type: { 
        type: String,
        default: 'physical', // [ Physical, digital]
    },
    price: { 
        sellingPrice : {
            type:Number,
            default:0
        },
        productPrice : {
            type:Number,
            default:0
        },
        discountPrice : {
            type:Number,
            default:0
        },
    },
    publish_date: {
        type : Date,
        default: Date.now
    },
    categoryType: { 
        type: String
    },
    slug: { 
        type: String, 
        lowercase:true,
        required:true,
        trim:true,
        unique:true,
    },
    skuCode: { 
        type: String,
    },
    short_details: { type : String},
    // storage : {
    //     type : [String],
    // },
    status : {
        type: String,
        default: 'active', // [ active, pending]
    }
},{timestamps:true})


const Product = model("Product", productSchema);

module.exports = Product;


