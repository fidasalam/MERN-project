const userHelper = require('../helpers/userHelper');

const userController = {
  
  

    postSignup: async (req, res) => {
        const { firstName, lastName, email, password } = req.body;
        const result = await userHelper.createUser(firstName, lastName, email, password);
        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }
        res.status(201).json({ message: 'User created successfully', user: result.user });
    
    },

    // Login
  

    postLogin: async (req, res) => {
        const { email, password } = req.body;
            const token = await userHelper.loginUser(email, password);
            res.json({ token });
        },

    // Logout
    logout: (req, res) => {
       
            res.clearCookie('token');
            res.json({ message: 'User logged out successfully' });
        },
};

module.exports = userController;
