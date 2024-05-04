const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const userHelper = {
    generateToken: (payload) => {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if (err) reject(err);
                resolve(token);
            });
        });
    },

    comparePassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    },
    
    createUser: async (firstName, lastName, email, password) => {
        if (password.length < 6 || password.length > 30) {
            return { success: false, message: 'Password must be between 6 and 30 characters long' };
        }

        if (firstName.length < 4 || firstName.length > 20) {
            return { success: false, message: 'First name must be between 2 and 20 characters long' };
        }

        if (lastName.length < 4 || lastName.length > 20) {
            return { success: false, message: 'Last name must be between 2 and 20 characters long' };
        }

        let user = await User.findOne({ email });
        if (user) {
            return { success: false, message: 'User already exists' };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ firstName, lastName, email, password: hashedPassword });
        await user.save();

        return { success: true, user };
    },
    
        
    

    loginUser: async (email, password) => {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isMatch = await userHelper.comparePassword(password, user.password);

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        const token = await userHelper.generateToken(payload);
        return token;
    },
};

module.exports = userHelper;
