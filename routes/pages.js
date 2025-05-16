const path = require('path');
const express = require('express');

const pages = express.Router();
module.exports = pages;

const db = require(path.join(__dirpath, 'data', 'db'));

pages.get('/:slug', (req, res) => {
    let the_page;

    db.get('SELECT * FROM Pages WHERE slug = ?', req.params.slug, (err, page) => {
        the_page = page;
    });

    db.all('SELECT * FROM Settings', (err, settings) => {
        let the_settings = {};

        settings.forEach((setting) => {
            const the_setting = setting.setting;
            const the_value = setting.value;

            the_settings[the_setting] = the_value;
        });

        if (the_page) {
            res.render('page', { settings: the_settings, page: the_page });
        } else {
            res.redirect('/');
        }
    });
});
