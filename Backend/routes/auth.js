const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// User Registration
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Registration data received:', req.body); // Log the received data
    const user = new User({ username, email, password });
    try {
        await user.save();
        console.log('User registered:', user); // Log the registered user
        res.status(201).json({ message: 'User registered successfully' }); // Ensure response is JSON
    } catch (error) {
        console.error('Registration error:', error); // Log the error for debugging
        res.status(400).json({ message: 'Registration failed', error: error.message }); // Ensure response is JSON
    }
});

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log('User logged in:', user); // Log the logged-in user
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
