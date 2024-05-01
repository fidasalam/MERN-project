const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongooseConnection = require('./config/db'); 
const userRoutes = require('./routes/userRoutes');
const adminRoutes =require ('./routes/adminRoutes')
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Configure CORS
const allowedOrigins = ['http://localhost:3000']; 
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true // Allow credentials (cookies, Authorization headers, etc.)
};
app.use(cors(corsOptions));


// Routes
app.use('/api/admin',adminRoutes)
app.use('/api/users', userRoutes);


app.get('/api/ping', (req, res) => {
    res.json({ message: 'Backend is up and running.' });
  });

// Connect to MongoDB
mongooseConnection.on("connected", () => {
    // Start your server here
    app.listen(PORT, () => {
        console.log(`Listening to request on http://localhost:${PORT}`);
    });
});

mongooseConnection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
    // Optionally, handle connection error here
});

