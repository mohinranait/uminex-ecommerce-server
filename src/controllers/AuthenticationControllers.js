const jwt = require('jsonwebtoken');
const { productionMode, jwtSecret } = require('../services/envSecret');
require("dotenv").config();

const createJwt = async (req, res) => {
    try {
        const body = req.body;
        // console.log('body', body);
        const token = jwt.sign(body, jwtSecret, {expiresIn:'1h'});
        // console.log(token);
        res.cookie('token', token , {
            // Liveside code 
            httpOnly: true,
            secure: true,
            sameSite:  'none',

            // Local server code
            // httpOnly : true,
            // secure: productionMode === 'production',
            // sameSite: productionMode === 'production' ? 'none' : 'strict'
        }).send({
            success : true,
            token,
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : error.message
        })
    }
}


// logout user and clear session
const userLogout = async (req, res) => {
    try {
        res.clearCookie("token", {maxAge:0}).send({
            success : true,
            message : "User logout"
        })
    } catch (error) {
        res.status(500).send({
            success : false,
            message : error.message
        })
    }
} 


module.exports = {
    createJwt,
    userLogout
}