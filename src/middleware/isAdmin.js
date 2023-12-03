const User = require("../models/UserModel")


module.exports = isAdmin = async (req, res, next) => {
    const email = req.user?.email
    const admin = await User.findOne({email});
    if( !admin ){
        return res.status(404).send({
            success : false,
            message : "unauthorize access",
        })
    }

    let getAdmin = false;
    if( admin.role === 'admin' ){
        getAdmin = true;
    }

    req.admin = getAdmin

    next();
}