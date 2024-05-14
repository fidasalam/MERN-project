const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuthMiddleware=require('../middleware/adminAuth')

// Admin home route
router.get('/userList', adminController.adminHome);


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
router.get('/updateuser/:id',adminAuthMiddleware, adminController.getUpdateUser);
router.post('/updateuser',adminAuthMiddleware, adminController.postUpdateUser);



// Error route
router.get('/error', adminController.errorPage);

module.exports = router;
