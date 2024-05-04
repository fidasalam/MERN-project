const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')



// Signup route
router.post('/signup', userController.postSignup);

// Login route
router.post('/login', userController.postLogin);

// Logout route
router.get('/logout', userController.logout);


module.exports = router;
