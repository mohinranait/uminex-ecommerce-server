const {model, Schema } = require("mongoose")

const colorSchema = new Schema({
    name : {
        type : String,
        trim: true,
    },
    slug : {
        type : String,
        lowercase: true,
    },
    colorCode : {
        type : String,
    },
    status : {
        type : Boolean,
        default : true
    }
   
},{timestamps:true});



const Color = model("Color", colorSchema);

module.exports = Color;