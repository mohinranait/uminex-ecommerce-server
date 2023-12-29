const Order = require("../models/OrdersModel");
const Product = require("../models/ProductModel");

const getAllOrders = async (req, res) => {
    try {
        const tokenEmail = req.user?.email;
        const email = req.query?.email;
        const userId = req.query?.userId;
        const request = req?.query?.request;

        if(request === 'user'){
            if(tokenEmail !== email){
                return res.status(401).send({
                    success: false,
                    message:'forbidden access',
                })
            }

            const filter = {
                userInfo: userId
            }

            const orders = await Order.find(filter).populate("userInfo");
            return  res.send({
                success: true,
                orders
            })
        }

        const orders = await Order.find({}).populate("userInfo");
        res.send({
            success: true,
            orders
        })
    } catch (error) {
        return res.status(500).send({
            message : error.message
        })
    }
}



// udpate orders by ID
const updateOrdersById = async (req, res) => {
    try {
        const id = req.params?.id;
        const {orderStatus} = req.body;
        // console.log(orderStatus);
        const isExistsOrder = await Order.findById(id);
        // console.log(isExistsOrder.orderHistory);
        const productsInfo = isExistsOrder?.orderHistory?.map((item) => {
            return {
                productId : item?.product?._id,
                quantity : item?.quantity
            }
        })
        if(orderStatus == 'shift'){
            // When order shift. then Product quantity decrement 
            productsInfo?.forEach( async (product) => {
                const findPoduct = await Product.findById({_id: product?.productId});
                const updaeQuantity = findPoduct?.isStock - product?.quantity;
                const isProduct = await Product.findByIdAndUpdate(
                    {
                        _id: product?.productId
                    },
                    {
                        isStock: updaeQuantity  
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                )
            })
        }else if(orderStatus == 'return'){
            // When order return. then product quantity increment
            productsInfo?.forEach( async (product) => {
                const findPoduct = await Product.findById({_id: product?.productId});
                const updaeQuantity = findPoduct?.isStock + product?.quantity;
                const isProduct = await Product.findByIdAndUpdate(
                    {
                        _id: product?.productId
                    },
                    {
                        isStock: updaeQuantity  
                    },
                    {
                        new: true,
                        runValidators: true
                    }
                )
            })
        }
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
        return res.status(500).send({
            message : error.message
        })
    }
}


// delete order by ID
const deleteOrdersById = async (req, res) => {
    try {
        const id = req.params?.id;
        const isAdmin = req.admin;
        if(isAdmin === false){
            return res.status(403).send({
                message : "forbidden access",
                success: false,
            })
        }
        
        const  order = await Order.findByIdAndDelete(id);
        if(!order){
            return res.status(404).send({
                success: false,
                message : "Notfound"
            })
        }

        res.status(200).send({
            success: true,
            message: "Deleted"
        })
    } catch (error) {
        
    }
}


module.exports = {
    getAllOrders,
    updateOrdersById,
    deleteOrdersById
}