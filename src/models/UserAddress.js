const {model, Schema, Types } = require("mongoose")

const userAddressSchema = new Schema({
    user : {
        type : Types.ObjectId,
        ref: "User",
    },
    fullName : {
        type : String,
    },
    mobile : {
        type : String,
    },
    division : {
        type : String,
    },
    district : {
        type : String,
    },
    policeStation : {
        type : String,
    },
    address : {
        type : String,
    },
    deliveryLocation : {
        type : String, // Office , home
    },
},{timestamps:true});


const Address = model("Address", userAddressSchema);

module.exports = Address;