const jwt = require('jsonwebtoken');
const { productionMode, jwtSecret } = require('../services/envSecret');


const createJwt = async (req, res) => {
    try {
        const body = req.body;
        // console.log('body', body);
        const token = jwt.sign(body, jwtSecret, {expiresIn:'1h'});
        res.cookie('token', token , {
            httpOnly : true,
            secure: productionMode === 'production',
            sameSite: productionMode === 'production' ? 'none' : 'strict'
        }).send({
            success : true,
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