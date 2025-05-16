const path = require('path');
const express = require('express');

const backend = express.Router();
module.exports = backend;

const db = require(path.join(__dirpath, 'data', 'db'));
const { ensureAuthenticated } = require(path.join(__dirpath, 'utils', 'auth'));

backend.post('/', ensureAuthenticated, (req, res) => {
    Object.keys(req.body).forEach((key, index) => {
        db.run('UPDATE Settings SET value = ? WHERE setting = ?', [req.body[key], key], (err) => {
            if (err) return res.redirect('/dash/settings');
        });

        if (index === Object.keys(req.body).length - 1) res.redirect('/dash/settings');
    });
});
