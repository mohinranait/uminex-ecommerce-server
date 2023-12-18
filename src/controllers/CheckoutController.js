const Order = require("../models/OrdersModel");
const ShoppingCart = require("../models/AddToCardModel");
const { stripeSecretKey } = require("../services/envSecret");
const stripe = require("stripe")(stripeSecretKey);

// Create order for Cash on delivery
const createNewOrders = async (req, res) => {
    try {
        const body  = req.body;        
        await Order.create(body);
        const query = {
            _id: {
                $in : body?.cartItems?.map(item => item) 
            }
        }
        await ShoppingCart.deleteMany(query);

        res.send({
            success: true,
            message : "success"
        })
    
    } catch (error) {
        return res.status(500).send({
            success: false,
            message : error.message
        })
    }
}



// Stripe payment and new order create
const stripePaymentAndOrder =  async (req, res) => {
    try {
        const session_id = req.query?.session_id;
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const body = req.body;
  
        if(session.payment_status === 'paid'){
          
            try {
                const transactionId = session?.payment_intent;
                const isExists =  await Order.findOne({transactionId});
                console.log("is Exists Order : ",transactionId,isExists);
                if(!isExists){
                    await Order.create({...body,transactionId });
                    const query = {
                        _id: {
                            $in : body?.cartItems?.map(item => item) 
                        }
                    }
                    // Delete older cart
                    await ShoppingCart.deleteMany(query);
                }
             
                res.send({
                    message: "successed",
                })
            } catch (error) {
                res.status(500).send({
                    message: error.message,
                })
            }
        }
    } catch (error) {
        return res.status(500).send({
            message : error.message
        })
    }
}



// Stripe payment intent
const stripePaymentIntentCreate = async (req, res) => {
    try {

        const {shopHistory,domainName}  = req.body;
        const lineItems =  shopHistory?.map((product)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:product?.product?.name,
                    images:[product?.product?.media?.images[0]]
                },
                unit_amount:product.price * 100,
            },
            quantity:product.quantity                
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:`${domainName}/success?method=stripe&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${domainName}/cancel`,
        });
       
        res.send({
            url: session.url
        })

    } catch (error) {
        return res.status(500).send({
            message : error.message
        })
    }
}



module.exports = {
    createNewOrders,
    stripePaymentAndOrder,
    stripePaymentIntentCreate
}