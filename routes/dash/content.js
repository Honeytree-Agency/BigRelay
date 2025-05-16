const path = require('path');
const express = require('express');
const slugify = require('slugify');
const { marked } = require('marked');
const { nanoid } = require('nanoid');
const sanitizeHTML = require('sanitize-html');

const content = express.Router();
module.exports = content;

const db = require(path.join(__dirpath, 'data', 'db'));
const { ensureAuthenticated } = require(path.join(__dirpath, 'utils', 'auth'));

content.get('/', ensureAuthenticated, (req, res) => {
    let the_pages = [];

    db.all('SELECT * FROM Pages ORDER BY title', (err, pages) => {
        the_pages = pages;
    });

    db.all('SELECT * FROM Settings', (err, settings) => {
        let the_settings = {};

        settings.forEach((setting) => {
            const the_setting = setting.setting;
            const the_value = setting.value;

            the_settings[the_setting] = the_value;
        });

        res.render('dash/content', { settings: the_settings, pages: the_pages });
    });
});

content.use('/', require(path.join(__dirname, 'content', 'utils')));
content.use('/update', require(path.join(__dirname, 'content', 'update')));
content.use('/create', require(path.join(__dirname, 'content', 'create')));
