const path = require('path');
const express = require('express');

const navigation = express.Router();
module.exports = navigation;

const db = require(path.join(__dirpath, 'data', 'db'));
const { ensureAuthenticated } = require(path.join(__dirpath, 'utils', 'auth'));

navigation.get('/', ensureAuthenticated, (req, res) => {
    db.all('SELECT * FROM Settings', (err, settings) => {
        let the_settings = {};

        settings.forEach((setting) => {
            const the_setting = setting.setting;
            const the_value = setting.value;

            the_settings[the_setting] = the_value;
        });

        res.render('dash/navigation', { settings: the_settings });
    });
});
