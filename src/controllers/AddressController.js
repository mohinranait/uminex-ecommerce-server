const Address = require("../models/UserAddress");
const User = require("../models/UserModel");

// Create new address
const createNewAddress = async (req, res) => {
    try {
        const tokenEmail = req.user?.email;
        const email  = req.query?.email;
        if(tokenEmail !== email){
            return res.status(401).send({
                message : "forbidden access",
                success: false,
            })
        }

        const body  = req.body;
        const address = await Address.create(body);
        await User.findOneAndUpdate({email}, {address: address?._id})
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

// get all address
const getAllAddress = async (req, res) => {
    try {
        const id = req.params?.user_id;
        const tokenEmail = req.user?.email;
        const user = await User.findById(id)
        if(tokenEmail !== user?.email){
            return res.status(401).send({
                message : "forbidden access",
                success: false,
            })
        }
        const address = await Address.find({user:id}).populate('user');
        res.send({
            success: true,
            address
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}

// get all address
const getSingleAddress = async (req, res) => {
    try {
        const id = req.params?.id;
        const email = req.query?.email;
        const tokenEmail = req.user?.email;
        if(tokenEmail !== email){
            return res.status(401).send({
                message : "forbidden access",
                success: false,
            })
        }
        const address = await Address.findById(id).populate('user');
        res.send({
            success: true,
            address
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message : error.message
        })
    }
}

// update address by Id
const updateAddressById = async (req, res) => {
    try {
        const id = req.params?.id;
        const email = req.query?.email;
        const tokenEmail = req.user?.email;
        if(tokenEmail !== email){
            return res.status(401).send({
                message : "forbidden access",
                success: false,
            })
        }
        const body = req.body;
        await Address.findByIdAndUpdate(id,{...body}, {
            new: true,
            runValidators : true,
        } );
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
    createNewAddress,
    getAllAddress,
    getSingleAddress,
    updateAddressById
}