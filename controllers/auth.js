const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
        return res.status(401).json({ message: 'User not found. Please try again.' });
    };
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
        return res.status(401).json({ message: "Login failed. Please try again." });
    };

    const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ token });

}


module.exports = authController;