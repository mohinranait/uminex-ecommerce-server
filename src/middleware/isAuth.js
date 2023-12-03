const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../services/envSecret');

module.exports = isAuth = async (req, res, next) => {
  
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).send({
            success : false,
            message : "unauthorize access",
        })
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if(err){
            return res.status(401).send({
                success : false,
                message : err.message,
            })
        }

        req.user = decoded
        next();
    })
  
}