const path = require('path');
const express = require('express');

const dash = express.Router();
module.exports = dash;

const db = require(path.join(__dirpath, 'data', 'db'));
const { ensureAuthenticated } = require(path.join(__dirpath, 'utils', 'auth'));

dash.get('/', ensureAuthenticated, (req, res) => {
    db.all('SELECT * FROM Settings', (err, settings) => {
        let the_settings = {};

        settings.forEach((setting) => {
            const the_setting = setting.setting;
            const the_value = setting.value;

            the_settings[the_setting] = the_value;
        });

        // res.render('dash/dash', { settings: the_settings });
        res.redirect('/dash/settings');
    });
});

dash.use('/content', require(path.join(__dirname, 'dash', 'content')));
dash.use('/settings', require(path.join(__dirname, 'dash', 'settings')));
dash.use('/navigation', require(path.join(__dirname, 'dash', 'navigation')));
