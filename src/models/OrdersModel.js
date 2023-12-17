const {model, Schema, Types } = require("mongoose")

const orderSchema = new Schema({
    userInfo : {
        type  : Types.ObjectId,
        ref: "User"
    },
    deliveryAddress : {
        type: String,
    },
    paymentMethod : {
        type : String, // ["cod", 'mobile payment']
    },
    paymentStatus : {
        type : String,
        default: 'unpaid' // ["unPaid", 'paid']
    },
    orderStatus : {
        type : String,
        default : 'pending', // pending, proccessing, delivery, cancal
    },
    transactionID : {
        type : String,
    },
    totalItems :{
        type: Number,
    },
    totalAmount : {
        type: Number,
    },
    totalDiscount : {
        type: Number,
        default: 0
    },
    orderHistory : [
        {
            product : {type: Object },
            quantity: {type:Number},
            price: {type: Number, default:0},
            totalPrice: {type:Number,default:0},
            varient : [
                {
                    label: String,
                    value: String,
                }
            ]
        }
    ]
},{timestamps:true});



const Order = model("Order", orderSchema);

module.exports = Order;