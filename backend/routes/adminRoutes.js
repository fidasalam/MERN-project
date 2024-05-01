const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin home route
router.get('/home', adminController.adminHome);


//Admin Login
router.get('/adminlogin', adminController.getAdminLogin);
router.post('/adminlogin', adminController.postAdminLogin);

//Admin Signup
router.post('/adminSignup', adminController.postAdminSignup);

// Search route
router.get('/search', adminController.getSearch);
router.post('/search', adminController.postSearch);
router.post('/suggestions', adminController.SearchSuggeston);


// Add user route
router.get('/adduser', adminController.getAddUser);
router.post('/adduser', adminController.postAddUser);

// Update user route
router.get('/updateuser/:id', adminController.getUpdateUser);
router.post('/updateuser', adminController.postUpdateUser);

// Delete user route
router.get('/delete/:id', adminController.deleteUser);

// Admin logout route
router.get('/adminlogout', adminController.adminLogout);

// Error route
router.get('/error', adminController.errorPage);

module.exports = router;
