const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const userController = {

    // Homepage
    getHomepage: (req, res) => {
        console.log(process.env.JWT_SECRET);

        res.json({ message: 'Welcome to the homepage' });
    },

    // Signup
    getSignup: (req, res) => {
        res.json({ message: 'Signup form goes here' });
    },
    
    postSignup: async (req, res) => {
        const { firstName, lastName, email, password } = req.body;

        try {
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password must be at least 6 characters long' });
            }
        
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            user = new User({ firstName, lastName, email, password });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Login
    getLogin: (req, res) => {
        res.json({ message: 'Login form goes here' });
    },

    postLogin: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    // Logout 
    logout: (req, res) => {
        try {
            // Clear the token cookie
            res.clearCookie('token');
            res.json({ message: 'User logged out successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error logging out.' });
        }
    },
};

module.exports = userController;
