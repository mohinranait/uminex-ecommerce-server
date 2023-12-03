const User = require("../models/UserModel");


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
        // console.log(req.params);
        const email = req.params?.email;
        const tokenEmaill = req.user?.email;
        if(email !== tokenEmaill){
            return res.status(403).send({
                success: false,
                message : "forbidden access",
            })
        }
        const user = await User.findOne({email});
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



// Get all user by 
const getAllUsers = async (req, res) => {
    try {
        const email = req.query?.email;
        const tokenEmail = req.user?.email;
        const isAdmin = req.admin // Boolean value
        // console.log(email);
        // console.log(tokenEmail);
        if(email !== tokenEmail || isAdmin === false ){
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
        if(email !== tokenEmaill){
            return res.status(403).send({
                success: false,
                message : "forbidden access",
            })
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



module.exports = {
    createNewUser,
    getSignleUserByEmail,
    getAllUsers,
    updateUserByEmail,
    deleteUserByEmail,
}