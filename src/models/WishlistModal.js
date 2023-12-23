const {model, Schema, Types } = require("mongoose")

const wishListSchema = new Schema({
    userInfo : {
        type  : Types.ObjectId,
        ref: "User"
    },
    product : {
        type  : Types.ObjectId,
        ref: "Product"
    },
  
},{timestamps:true});



const Wishlist = model("Wishlist", wishListSchema);

module.exports = Wishlist;