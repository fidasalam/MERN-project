const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


// HomePage route

router.get('/',userController.getHomepage)

// Signup route
router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);

// Login route
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

// Logout route
router.get('/logout', userController.logout);


module.exports = router;
