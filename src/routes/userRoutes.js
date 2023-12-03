const { createNewUser, getSignleUserByEmail, getAllUsers, updateUserByEmail, deleteUserByEmail } = require('../controllers/UserController');
const isAdmin = require('../middleware/isAdmin');
const isAuth = require('../middleware/isAuth');

const userRouter = require('express').Router();

userRouter.post('/users', createNewUser )
userRouter.get('/user/:email', isAuth, getSignleUserByEmail )
userRouter.get('/users', isAuth, isAdmin,  getAllUsers );
userRouter.patch('/user/:email', isAuth, updateUserByEmail );
userRouter.delete('/user/:email', isAuth,isAdmin, deleteUserByEmail );


module.exports = userRouter