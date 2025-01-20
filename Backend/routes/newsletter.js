const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        const subscriber = new Newsletter({ email });
        await subscriber.save();
        res.status(201).json({ message: 'Successfully subscribed' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already subscribed' });
        }
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;