
const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');


router.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
});

router.post('/sign-in', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await User.findOne({username});
    if (!existingUser) {
        return res.send('Login failed. Please try again.');
    };
    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
        return res.send("Login failed. Please try again.");
    };
    req.session.user = {
        username: existingUser.username,
        _id: existingUser._id
    };
    req.session.save(() => {
        res.redirect("/");
    });
});

router.get('/sign-out', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;