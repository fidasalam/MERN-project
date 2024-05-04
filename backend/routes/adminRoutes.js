const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin home route
router.get('/home', adminController.adminHome);


//Admin Login
router.post('/adminlogin', adminController.postAdminLogin);

//Admin Signup
router.post('/adminSignup', adminController.postAdminSignup);

// Search route
router.post('/search', adminController.postSearch);
router.post('/suggestions', adminController.SearchSuggeston);


// Add user route
router.post('/adduser', adminController.postAddUser);

// Update user route
router.get('/updateuser/:id', adminController.getUpdateUser);
router.post('/updateuser', adminController.postUpdateUser);



// Error route
router.get('/error', adminController.errorPage);

module.exports = router;
