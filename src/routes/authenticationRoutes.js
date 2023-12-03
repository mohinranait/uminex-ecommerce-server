const { createJwt, userLogout } = require('../controllers/AuthenticationControllers');

const authenticationRoute = require('express').Router();


authenticationRoute.post('/jwt', createJwt);
authenticationRoute.post('/logout-user', userLogout);


module.exports = authenticationRoute