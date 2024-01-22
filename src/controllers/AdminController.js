const Order = require("../models/OrdersModel");
const Product = require("../models/ProductModel")

const getAdminAnalytics = async (req, res) => {
    try {
        const totalProducts = await Product.find({}).countDocuments();
        const successOrders = await Order.find({orderStatus: 'delivery'}).countDocuments(); 
        const sellAmounts  = await Order.aggregate([
            {
                $unwind: "$orderHistory"
            },
            {
                $match: {
                    orderStatus: "delivery",
                }
            },
            {
                $group: {
                    _id: null,
                    sellsPrices: {
                        $sum: "$orderHistory.totalPrice"
                    }
                }
            }
        ])

        const piCharts  = await Order.aggregate([
            {
              $unwind: "$orderHistory"
            },
            {
              $match: {
                orderStatus: "delivery"
              }
            },
            {
              $group: {
                _id: "$orderHistory.product.categoryType",
                  sellItems: {
                  $sum: 1
                }
              }
            },
            {
              $project: {
                _id: 0,
                name: "$_id",
                value: "$sellItems"
              }
            }
          ])
        res.send({
            totalProducts,
            successOrders,
            totalIncome: sellAmounts[0].sellsPrices,
            piCharts
        })
    } catch (error) {
        
    }
}

module.exports = {
    getAdminAnalytics
}