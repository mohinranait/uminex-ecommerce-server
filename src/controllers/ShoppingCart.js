const ShoppingCart = require("../models/AddToCardModel");


// Product add to in user shopping cart
const productStoreInShoppingCart = async (req, res) => {
    try {
        const body = req.body;
        // console.log('Cart Store ',body);
        const isExisQuery = {
            product: body?.product,
            user: body?.user,
        }
        const isExists = await ShoppingCart.findOne(isExisQuery);
        if(isExists){
            await ShoppingCart.findByIdAndUpdate(isExists?._id ,{
                quantity : isExists.quantity + 1,
            }, {
                new : true, 
                runValidators: true,
            });
            return res.send({
                success : true,
                message : "Shopping cart added",
            })
        }
        const result = await ShoppingCart.create(body);
        // console.log(result);
        res.send({
            success : true,
            message : "Shopping cart added",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}


// user wish carts
const getUserWishAllCarts = async (req, res) => {
    try {
        const id = req.query?.user_id;
        // console.log("Cart user ID ",id);
        const carts = await ShoppingCart.find({user:id}).populate("user").populate( {path:"product", populate: {path:'category', model:"Category"} } );
        const totalCarts = await ShoppingCart.find({user:id}).populate("user").countDocuments();
        const totalPrice = carts.reduce((total, current) => {
            return total + (current?.product?.price?.sellingPrice * current?.quantity)
        },0);
        // console.log(totalPrice);
        res.send({
            success: true,
            items:carts,
            totalPrice, 
            totalCarts
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}

// Remove Shopping cart
const removeShoppingCarts = async (req, res) => {
    try {
        const {request,email} = req.query;
        const tokenEmaill = req.user?.email;
        if(request !== 'admin'){
            if(email !== tokenEmaill ){
                return res.status(403).send({
                    success: false,
                    message : "forbidden access",
                })
            }
        }

        const id = req.params?.id;
        const cart = await ShoppingCart.findByIdAndDelete(id);
        if(!cart){
            return res.status(404).send({
                success:false,
                message: "Notfound"
            })
        };
        res.send({
            success : true,
            message  : "Shopping cart is removed",
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}


// Update Shopping carts by ID
const udpateShoppingCarts = async (req, res) => {
    try {
        const tokenEmaill = req.user?.email;
        const email = req.query?.email;
        if( email !== tokenEmaill ){
            return res.status(403).send({
                success : false,
                message : "forbidden access"
            })
        }
        const id = req.params?.id;
        const body = req.body;
        const cart = await ShoppingCart.findByIdAndUpdate(id, body, {
            new : true,
            runValidators : true,
        })
        if(!cart){
            return res.status(404).send({
                success : false,
                message : "Notfound"
            })
        }

        res.send({
            success: true,
            message: "Updated",
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}


module.exports = {
    productStoreInShoppingCart,
    getUserWishAllCarts,
    removeShoppingCarts,
    udpateShoppingCarts
}