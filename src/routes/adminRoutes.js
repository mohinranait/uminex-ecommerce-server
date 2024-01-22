const adminRoutes = require('express').Router();

const { getAdminAnalytics } = require('../controllers/AdminController');
const isAuth = require('../middleware/isAuth');



adminRoutes.get('/admin-analytics', isAuth, getAdminAnalytics )


module.exports = adminRoutes;