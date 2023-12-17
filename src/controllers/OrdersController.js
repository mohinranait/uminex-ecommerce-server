const Order = require("../models/OrdersModel");

const getAllOrders = async (req, res) => {
    try {
        const tokenEmail = req.user?.email;
        const email = req.query?.email;
        const request = req?.query?.request;

        const orders = await Order.find({}).populate("userInfo");
        res.send({
            success: true,
            orders
        })
    } catch (error) {
        
    }
}



// udpate orders by ID
const updateOrdersById = async (req, res) => {
    try {
        const id = req.params?.id;
        const order = await Order.findByIdAndUpdate(id, req.body , {
            new : true,
            runValidators : true,
        })
        if(!order){
            return res.status(404).send({
                success: false,
                message : "Notfound"
            })
        }
        res.send({
            success: true,
            message : "Updated"
        })
    } catch (error) {
        
    }
}


module.exports = {
    getAllOrders,
    updateOrdersById
}