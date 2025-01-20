const express = require('express');
const cors = require('cors'); // Import CORS
const mongoose = require('mongoose');
const path = require('path');
const { exec } = require('child_process'); // Import exec to run shell commands
require('dotenv').config();

const app = express();
app.use(cors()); // Use CORS middleware
app.use(express.json());

// Middleware
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/newsletter', require('./routes/newsletter'));
app.use('/api/auth', require('./routes/auth')); // Added authentication routes

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

const PORT = process.env.PORT || 5000; // Changed to 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    exec(`start http://localhost:${PORT}`); // Open the browser to the localhost link
});
