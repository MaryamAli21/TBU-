
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');


router.post('/sign-in', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        return res.send('Login failed. Please try again.');
    };
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
        return res.send("Login failed. Please try again.");
    };

    const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(403).json({ token });

});


module.exports = router;