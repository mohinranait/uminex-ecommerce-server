const {model, Schema,Types } = require("mongoose")

const cartSchema = new Schema({
    product : {
        type  : Types.ObjectId,
        ref: "Product"
    },
    user : {
        type : Types.ObjectId,
        ref: "User"
    },
    quantity : {
        type: Number,
        default:1
    },
    varient : [
        {
            label : String,
            value : String,
        }
    ],
},{timestamps:true})



const ShoppingCart = model("ShoppingCart", cartSchema);

module.exports = ShoppingCart;