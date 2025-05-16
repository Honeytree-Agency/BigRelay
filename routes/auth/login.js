const path = require('path');
const express = require('express');
const passport = require('passport');

const login = express.Router();
module.exports = login;

const db = require(path.join(__dirpath, 'data', 'db'));
const { forwardAuthentication } = require(path.join(__dirpath, 'utils', 'auth'));

login.get('/', forwardAuthentication, (req, res) => {
    db.all('SELECT * FROM Settings', (err, settings) => {
        let the_settings = {};

        settings.forEach((setting) => {
            const the_setting = setting.setting;
            const the_value = setting.value;

            the_settings[the_setting] = the_value;
        });

        res.render('auth/login', { settings: the_settings });
    });
});

login.post('/', passport.authenticate('local', { successRedirect: '/dash', failureRedirect: '/auth/login' }));
