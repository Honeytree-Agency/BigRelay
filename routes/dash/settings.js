const path = require('path');
const bcrypt = require('bcrypt');
const express = require('express');

const settings = express.Router();
module.exports = settings;

const db = require(path.join(__dirpath, 'data', 'db'));
const { ensureAuthenticated } = require(path.join(__dirpath, 'utils', 'auth'));

settings.get('/', ensureAuthenticated, (req, res) => {
    const the_user = {};

    db.get('SELECT * FROM Users WHERE id = ?', req.user.id, (err, user) => {
        the_user.id = user.id;
        the_user.username = user.username;
    });

    db.all('SELECT * FROM Settings', (err, settings) => {
        let the_settings = {};

        settings.forEach((setting) => {
            const the_setting = setting.setting;
            const the_value = setting.value;

            the_settings[the_setting] = the_value;
        });

        res.render('dash/settings', { settings: the_settings, user: the_user });
    });
});

settings.use('/user', require(path.join(__dirname, 'settings', 'user')));
settings.use('/backend', require(path.join(__dirname, 'settings', 'backend')));
