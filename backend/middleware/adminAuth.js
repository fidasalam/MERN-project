const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const adminAuthMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token');

    console.log('Token:', token); 
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
      
        req.admin = decoded.admin; 
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error); 
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = adminAuthMiddleware;
