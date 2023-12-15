const Order = require("../models/OrdersModel");
const ShoppingCart = require("../models/AddToCardModel")


const createNewOrders = async (req, res) => {
    try {
        const body  = req.body;
        const i = body?.cartItems?.map(item => item )
        // console.log(i);
        // console.log('i');
        // const order = await Order.create(body);
        const query = {
            _id: {
                $in : body?.cartItems?.map(item => item) 
            }
        }
        
        // console.log(i);
        await ShoppingCart.deleteMany(query);

        res.send({
            success: true,
            message : "success"
        })
    } catch (error) {
        
    }
}


module.exports = {
    createNewOrders,
}