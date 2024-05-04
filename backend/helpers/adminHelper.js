const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');

const adminHelper = {
    // Admin login
    adminLogin: async (username, password) => {
        const admin = await Admin.findOne({ username });
        if (!admin) return null;
        
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return null;
        const payload = { admin: { id: admin.id } };
        const token = jwt.sign(payload, process.env.JWT_ADMIN_SECRET, { expiresIn: '1h' });
        return token;
    },

    // Admin signup
    adminSignup: async (username, password) => {
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) return false;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({ username, password: hashedPassword });
        await newAdmin.save();
        return true;
    },

    // Get all users
    getAllUsers: async () => {
        return await User.find();
    },

    // Search user by email
    searchUserByEmail: async (email) => {
        return await User.findOne({ email });
    },

// Search user by full name
searchUser: async (fullName) => {
    const [firstName, lastName] = fullName.split(' ');
    return await User.findOne({
        firstName: { $regex: new RegExp(firstName, 'i') },
        lastName: { $regex: new RegExp(lastName, 'i') }
    });
},



    // Create new user
    createUser: async (userData) => {
        return await User.create(userData);
    },

    // Update user
    updateUser: async (userId, newData) => {
        return await User.findByIdAndUpdate(userId, newData, { new: true });
    },

    //search user by Id
    findUserById:async(userId)=>{
        return await User.findById(userId)
    },

    
};

module.exports = adminHelper;
