const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');

const user = express.Router();
module.exports = user;

const db = require(path.join(__dirpath, 'data', 'db'));
const { ensureAuthenticated } = require(path.join(__dirpath, 'utils', 'auth'));

user.post('/', ensureAuthenticated, (req, res) => {
    db.get('SELECT * FROM Users WHERE id = ?', req.body.id, (err, user) => {
        if (err || !user) return res.redirect('/dash/settings');

        const id = req.body.id;
        const username = req.body.username;
        const password = bcrypt.hashSync(req.body.password, 12);

        db.run('UPDATE Users SET username = ?, password = ? WHERE id = ?', [username, password, id], (err) => {
            if (err) return res.redirect('/dash/settings');

            res.redirect('/dash/settings');
        });
    });
});
