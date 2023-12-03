const {model, Schema } = require("mongoose")

const categorySchema = new Schema({
    name : {
        type : String,
        trim: true,
    },
    slug : {
        type : String,
        lowercase: true,
        trim: true,
    },
    image : {
        type : String,
        trim: true,
    },
    status : {
        type : Boolean,
        default: true,
    },
   
},{timestamps:true});


const Category = model("Category", categorySchema);
module.exports = Category;