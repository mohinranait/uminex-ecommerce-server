const {model, Schema } = require("mongoose")

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
        type : String,
    },
    mobile : {
        type : String,
    },
},{timestamps:true});


const User = model("User", userSchema);

module.exports = User;