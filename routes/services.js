const express = require('express');
const router = express.Router();
const Inquiry = require('../models/inquiry');

router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquiry.find();

        res.json(inquiries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const inquiry = new Inquiry(req.body);
    try {
        const savedInquiry = await inquiry.save();
        res.status(201).json(savedInquiry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;