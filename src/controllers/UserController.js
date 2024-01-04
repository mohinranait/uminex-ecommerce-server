const ShoppingCart = require("../models/AddToCardModel");
const Order = require("../models/OrdersModel");
const User = require("../models/UserModel");
const Wishlist = require("../models/WishlistModal");


const createNewUser = async (req, res) => {
    try {
        const user = req.body;
        const result = await User.create(user);
        res.status(200).send({
            success : true,
            message : "User created",
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : "Somthing wrong",
        })
    }
}


// Get signle user by email
const getSignleUserByEmail = async (req, res) => {
    try {
       
        const email = req.params?.email;
        const tokenEmaill = req.user?.email;
        const accessRequest = req.query?.request; // [admin,user]

        if(accessRequest !== 'admin'){
            if(email !== tokenEmaill ){
                return res.status(403).send({
                    success: false,
                    message : "forbidden access",
                })
            }
        }
       
        const user = await User.findOne({email}).populate('address');
        if(!user){
            return res.status(404).send({
                success: false,
                message : "User notfound",
            })
        }
        let admin = false;
        if(user.role === 'admin'){
            admin = true;
        }
        res.send({
            success: true,
            user,
            admin,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message,
        })
    }
}


// Get signle user by ID
const getSignleUserById = async (req, res) => {
    try {
       
        const id = req.params?.id;
        const user = await User.findById(id).populate("address");

        if(!user){
            return res.status(404).send({
                success: false,
                message : "User notfound",
            })
        }
        res.send({
            user,
            success: true,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message,
        })
    }
}



// Get all user by 
const getAllUsers = async (req, res) => {
    try {
        const isAdmin = req.admin // Boolean value
        if( isAdmin === false ){
            return res.status(403).send({
                success: false,
                message: "forbidden access",
            })
        }

        const users = await User.find({});
       
        res.send({
            success: true,
            users,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message,
        })
    }
}

// update user by email
const updateUserByEmail = async (req, res) => {
    try {
        const email = req.params?.email;
        const tokenEmaill = req.user?.email;
        const accessRequest = req.query?.request; // [admin,user]

        if(accessRequest !== 'admin'){
            if(email !== tokenEmaill ){
                return res.status(403).send({
                    success: false,
                    message : "forbidden access",
                })
            }
        }

        const userUpdateData = req.body;
        const user = await User.findOneAndUpdate({email}, userUpdateData, {new:true, runValidators:true})
        if(!user){
            return res.status(404).send({
                success:false,
                message: "User not found"
            })
        };

        res.send({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message
        })
    }
}

// Delete user by email
const deleteUserByEmail = async (req, res) => {
    try {
        const email = req.params?.email;
        const isAdmin = req.admin
        if( isAdmin === false){
            return res.status(403).send({
                success: false,
                message : "forbidden access",
            })
        }
      
        const user = await User.findOneAndDelete({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message: "User not found"
            })
        };

        res.send({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message
        })
    }
}


const userDashboardAnalitycs = async (req, res) => {
    try {
        const userId = req.query?.userId;
   
        const totalCarts = await ShoppingCart.find({user : userId}).countDocuments();
        const totalOrders = await Order.find({userInfo:userId}).countDocuments();
        const wishlists = await Wishlist.find({userInfo:userId}).countDocuments();
        res.send({
            totalCarts,
            totalOrders,
            wishlists
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message: error.message
        })
    }
}


module.exports = {
    createNewUser,
    getSignleUserByEmail,
    getAllUsers,
    updateUserByEmail,
    deleteUserByEmail,
    userDashboardAnalitycs,
    getSignleUserById
}