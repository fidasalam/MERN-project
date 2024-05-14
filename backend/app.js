const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongooseConnection = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const adminRoutes =require ('./routes/adminRoutes')
const app = express();
const PORT = process.env.PORT || 5000;
const connectToDatabase = require('./config/db');

// Middleware
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000' }));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


// Routes
app.use('/api/admin',adminRoutes)
app.use('/api/users', userRoutes);

connectToDatabase();



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
