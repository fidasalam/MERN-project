const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User')

const adminController = {
    // Admin login

    getAdminLogin: (req, res) => {
        res.json({ message: 'Login form goes here' });
    },


   postAdminLogin: async (req, res) => {
        const { username, password } = req.body;

        try {
            const admin = await Admin.findOne({ username });

            if (!admin) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, admin.password);

            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid credentials' });
            }

            // Create JWT payload
            const payload = {
                admin: {
                    id: admin.id,
                },
            };

            // Sign JWT
            jwt.sign(
                payload,
                process.env.JWT_ADMIN_SECRET,
                { expiresIn: '1h' }, // Token expires in 1 hour
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },


    // Signup

    postAdminSignup: async (req, res) => {
        const { username, password } = req.body;

        try {
            // Check if admin with the same username already exists
            const existingAdmin = await Admin.findOne({ username });

            if (existingAdmin) {
                return res.status(400).json({ error: 'Admin already exists' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new admin
            const newAdmin = new Admin({
                username,
                password: hashedPassword
            });

            await newAdmin.save();

            res.status(201).json({ message: 'Admin created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Admin home
    adminHome: async (req, res) => {
        try {
            const userlist = await User.find();
            res.json({ users: userlist });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching admin home.' });
        }
    },

    // Search
    getSearch: (req, res) => {
        res.json({ message: 'Search form' });
    },


    SearchSuggeston: async (req, res) => {
        const { searchQuery } = req.body;

        try {
            // Get suggestions based on first name or last name using regex
            const suggestions = await User.find({
                $or: [
                    { firstName: { $regex: new RegExp(searchQuery, 'i') } }, // Case-insensitive search for first name
                    { lastName: { $regex: new RegExp(searchQuery, 'i') } } // Case-insensitive search for last name
                ]
            }).limit(5); // Limit the number of suggestions to 5
            
            if (suggestions.length > 0) {
                res.json({ suggestions });
            } else {
                res.json({ message: 'No suggestions found.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching suggestions.' });
        }
    },

    postSearch: async (req, res) => {
        const { searchQuery } = req.body;
    
        try {
            // Search users based on first name or last name using regex
            const foundUsers = await User.find({
                $or: [
                    { firstName: { $regex: new RegExp(searchQuery, 'i') } }, // Case-insensitive search for first name
                    { lastName: { $regex: new RegExp(searchQuery, 'i') } } // Case-insensitive search for last name
                ]
            });
            
            if (foundUsers.length > 0) {
                res.json({ users: foundUsers });
            } else {
                res.json({ message: 'No users found.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error searching users.' });
        }
        },
    

    // Add User
    getAddUser: (req, res) => {
        res.json({ message: 'Add user form' });
    },

    postAddUser: async (req, res) => {
        try {
            const data = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };

            const existingUser = await User.findOne({ email: data.email });

            if (existingUser) {
                return res.status(400).json({ error: 'User with this email already exists.' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);
            data.password = hashedPassword;

            await User.create(data);

            res.status(201).json({ message: 'User added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error adding user.' });
        }
    },

    // Update User
    getUpdateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findById(userId);
            res.json({ user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error fetching user for update.' });
        }
    },

    postUpdateUser: async (req, res) => {
        const { userId, email, firstName, lastName} = req.body;

        try {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const existingUserWithEmail = await User.findOne({ email });

            if (existingUserWithEmail && existingUserWithEmail._id.toString() !== userId) {
                return res.status(400).json({ error: 'Email already exists for another user.' });
            }

            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
        

            await user.save();

            res.json({ message: 'User information updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating user information.' });
        }
    },

    // Delete User
    deleteUser: async (req, res) => {
        try {
            const userId = req.params.id;
    
            // Find the user by ID
            const userToDelete = await User.findById(userId);
    
            // If user is not found, return 404 error
            if (!userToDelete) {
                return res.status(404).json({ error: 'User not found.' });
            }
    
            // Delete the user
            await userToDelete.deleteOne();
    
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Error deleting user.' });
        }
    },
    

    // Admin logout
    adminLogout: (req, res) => {
        try {
            res.clearCookie('token'); // Clear the token cookie
            res.json({ message: 'Logout Successfully..!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error logging out.' });
        }
    },

    // Error page
    errorPage: (req, res) => {
        res.json({ error: 'An error occurred.' });
    },
};

module.exports = adminController;
