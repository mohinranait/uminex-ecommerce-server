const {model, Schema } = require("mongoose")

const brandSchema = new Schema({
    name : {
        type : String,
        trim: true,
    },
    slug : {
        type : String,
        lowercase: true,
    },
    logo : {
        type : String,
        trim: true,
    },
    status : {
        type : Boolean,
        default: true,
    },
   
},{timestamps:true});



const Brand = model("Brand", brandSchema);

module.exports = Brand;