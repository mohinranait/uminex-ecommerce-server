const {model, Schema, Types } = require("mongoose")

const userSchema = new Schema({
    userName : {
        type : String,
        trim: true,
    },
    name : {
        type : String,
    },
    email : {
        type : String,
        trim: true,
        lowercase: true,
    },
    role : {
        type : String,
        default: "user"
    },
    address : {
        type : Types.ObjectId,
        ref: "Address"
    },
    mobile : {
        type : String,
    },
    company : {
        type : String,
    },
    avater : {
        type : String,
    },
    profile : {
        type : String,
        default : 'active' // [ active , block, pending]
    },
},{timestamps:true});


const User = model("User", userSchema);

module.exports = User;