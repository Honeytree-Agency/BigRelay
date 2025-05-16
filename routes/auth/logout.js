const express = require('express');

const logout = express.Router();
module.exports = logout;

logout.get('/', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.redirect('/dash');
        res.redirect('/');
    });
});
