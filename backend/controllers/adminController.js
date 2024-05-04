const adminHelper = require('../helpers/adminHelper');

const adminController = {
    // Admin login
    postAdminLogin: async (req, res) => {
        const { username, password } = req.body;
         const token = await adminHelper.adminLogin(username, password);
            if (!token) return res.status(400).json({ error: 'Invalid credentials' });
            res.json({ token });
        } ,

    // Admin signup
    postAdminSignup: async (req, res) => {
        const { username, password } = req.body;
         const success = await adminHelper.adminSignup(username, password);
        if (!success) return res.status(400).json({ error: 'Admin already exists' });
         res.status(201).json({ message: 'Admin created successfully' });
        },
    

    // Admin home
    adminHome: async (req, res) => {
            const userlist = await adminHelper.getAllUsers();
            res.json({ users: userlist });
        },

// Search
SearchSuggeston: async (req, res) => {
    let { searchQuery } = req.body;
    searchQuery = searchQuery.trim().replace(/\s+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        const user = await adminHelper.searchUser(searchQuery);
        if (user) {
            res.json({ suggestions: [user] });
        } else {
            res.json({ message: 'No suggestions found.' });
        }
    },

postSearch: async (req, res) => {
    let { searchQuery } = req.body;
    searchQuery = searchQuery.trim().replace(/\s+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    
        const user = await adminHelper.searchUser(searchQuery);
        if (user) {
            res.json({ users: [user] });
        } else {
            res.json({ message: 'No users found.' });
        }
   },



    // Add User
    postAddUser: async (req, res) => {
        
            const data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };

            const existingUser = await adminHelper.searchUserByEmail(data.email);

            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists.' });
            }

            await adminHelper.createUser(data);

            res.status(201).json({ message: 'User added successfully' });
        } ,

    // Update User
    getUpdateUser: async (req, res) => {
    
            const userId = req.params.id;
            const user = await adminHelper.findUserById(userId);
            res.json({ user });
        },

    postUpdateUser: async (req, res) => {
        const { userId, email, firstName, lastName} = req.body;

            const user = await adminHelper.findUserById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const existingUserWithEmail = await adminHelper.searchUserByEmail(email);

            if (existingUserWithEmail && existingUserWithEmail._id.toString() !== userId) {
                return res.status(400).json({ error: 'Email already exists for another user.' });
            }

            const updatedUser = await adminHelper.updateUser(userId, { firstName, lastName, email });
            res.json({ message: 'User information updated successfully', user: updatedUser });
        },
    // Admin logout
    adminLogout: (req, res) => {
       
            res.clearCookie('token'); // Clear the token cookie
            res.json({ message: 'Logout Successfully..!' });
        } ,

    // Error page
    errorPage: (req, res) => {
        res.json({ error: 'An error occurred.' });
    },
};

module.exports = adminController;
