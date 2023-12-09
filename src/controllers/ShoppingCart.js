const ShoppingCart = require("../models/AddToCardModel");


// Product add to in user shopping cart
const productStoreInShoppingCart = async (req, res) => {
    try {
        const body = req.body;
        // console.log('Cart Store ',body);
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
        res.send({
            success: true,
            carts,
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


module.exports = {
    productStoreInShoppingCart,
    getUserWishAllCarts,
    removeShoppingCarts
}