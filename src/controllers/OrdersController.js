const Order = require("../models/OrdersModel");
const Product = require("../models/ProductModel");

const getAllOrders = async (req, res) => {
    try {
        const tokenEmail = req.user?.email;
        const email = req.query?.email;
        const userId = req.query?.userId;
        const request = req?.query?.request;

        const sort = 'desc';
        const sortFiled = 'createdAt';

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

            const orders = await Order.find(filter)
            .populate("userInfo")
            .sort({[sortFiled]: sort === 'asc' ? 1 : -1})

            return  res.send({
                success: true,
                orders
            })
        }

        const orders = await Order.find({})
        .populate("userInfo").populate('deliveryAddress')
        .sort({[sortFiled]: sort === 'asc' ? 1 : -1});
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

// Get single orders
const getSingleOrder = async (req, res) => {
    try {
        const tokenEmail = req.user?.email;
        const email = req.query?.email;
        const userId = req.query?.userId;
        const request = req?.query?.request || 'admin';
        const orderId = req.params?.id;


        if(request === 'user'){
            if(tokenEmail !== email){
                return res.status(401).send({
                    success: false,
                    message:'forbidden access',
                })
            }

            let query = {
                _id : orderId,
            }

            // const filter = {
            //     userInfo: userId
            // }

            const order = await Order.findById(query)
            if( order?.userInfo?._id != userId ){
                return res.status(401).send({
                    success: false,
                    message:'forbidden access',
                })
            }
            return  res.send({
                success: true,
                order
            })
        }

        const order = await Order.findById({_id:orderId}).populate("userInfo").populate('deliveryAddress');
        res.send({
            success: true,
            order
        })
    } catch (error) {
        return res.status(500).send({
            message : error.message
        })
    }
}


// update product methods
const updateProductFindById = async (id, document) => {
    try {
        await Product.findByIdAndUpdate(
            { _id: id},
            document,
            {
                new: true,
                runValidators: true
            }
        )
    } catch (error) {
        return error
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
            // delivery
            // When order shift. then Product quantity decrement 
            productsInfo?.forEach( async (product) => {
                const findPoduct = await Product.findById({_id: product?.productId});
                const updaeQuantity = findPoduct?.isStock - product?.quantity;
                const updateProduct = {
                    isStock: updaeQuantity,
                }
                // update product method
                updateProductFindById(findPoduct?._id , updateProduct )
               
            })
        }else if(orderStatus == 'return'){
            // When order return. then product quantity increment
            productsInfo?.forEach( async (product) => {
                const findPoduct = await Product.findById({_id: product?.productId});
                const updaeQuantity = findPoduct?.isStock + product?.quantity;
                const updateProduct = {
                    isStock: updaeQuantity  
                }
               // update product method
               updateProductFindById(findPoduct?._id , updateProduct )
            })
        }else if( orderStatus == 'delivery' ){
            productsInfo?.forEach( async (product) => {
                const findPoduct = await Product.findById({_id: product?.productId});
                const updateProduct = {
                    sellQuantity:  findPoduct?.sellQuantity + product?.quantity
                }
                // update product method
                updateProductFindById(findPoduct?._id , updateProduct )
               
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
            message : "Updated",
            order
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
    getSingleOrder,
    updateOrdersById,
    deleteOrdersById,
}