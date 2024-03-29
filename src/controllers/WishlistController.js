const User = require("../models/UserModel");
const Wishlist = require("../models/WishlistModal");


// Create new wishlist
const createNewWishlist = async (req, res) => {
    try {
        const email = req.params?.email;
        const body = req.body;
        const tokenEmail = req.user?.email;
        if(tokenEmail !== email){
            return res.status(401).send({
                message : "forbidden access",
                success: false,
            })
        }

        const query = {
            userInfo : body?.userInfo,
            product : body?.product,
        }
        const isExists = await Wishlist.findOne(query);
        // console.log(isExists);
        if(isExists){
            return res.send({
                success: 'isExists',
                message : "This product already exists",
            })
        }


        await Wishlist.create(body);
        res.send({
            success: true
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}

// get all wishlist
const getAllWishlistForUser = async (req, res) => {
    try {
        const id = req.params?.user_id;
        const user = await User.findById(id);
        const tokenEmail = req.user?.email;
        if(tokenEmail !== user?.email){
            return res.status(401).send({
                message : "forbidden access",
                success: false,
            })
        }
        const wishlists = await Wishlist.find({userInfo:id}).populate('product');
        res.send({
            success: true,
            wishlists
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}

// update wishlist by Id
const deleteWishlistById = async (req, res) => {
    try {

        const {product_id,email,user_id} = req.query;
        const tokenEmail = req.user?.email;
        if(tokenEmail !== email){
            return res.status(401).send({
                message : "forbidden access",
                success: false,
            })
        }

        const query = {
            userInfo : user_id,
            product : product_id
        }
        
        const wishlist = await Wishlist.findOne(query);
        if(!wishlist){
            return res.status(404).send({
                message : "Notfound",
                success: false,
            })
        }
        await Wishlist.findByIdAndDelete(wishlist?._id)
        res.send({
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}


module.exports = {
    createNewWishlist,
    getAllWishlistForUser,
    deleteWishlistById,
}