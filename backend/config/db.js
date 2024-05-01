const mongoose = require("mongoose");

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/admin", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1); // Exit with failure
    }
};

// Call connectDB function to establish connection
connectDB();

// Export the Mongoose connection object
module.exports = mongoose.connection;
