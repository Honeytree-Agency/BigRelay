const path = require('path');
const express = require('express');

const utils = express.Router();
module.exports = utils;

const db = require(path.join(__dirpath, 'data', 'db'));
const { ensureAuthenticated } = require(path.join(__dirpath, 'utils', 'auth'));

utils.get('/slug/:id', ensureAuthenticated, (req, res) => {
    db.get('SELECT slug FROM Pages WHERE id = ?', req.params.id, (err, page) => {
        if (err) return res.json({ slug: 'error' });

        const slug = page.slug;
        res.json({ slug });
    });
});

utils.get('/delete/:id', ensureAuthenticated, (req, res) => {
    db.run('DELETE FROM Pages WHERE id = ?', req.params.id, (err) => {
        res.redirect('/dash/content');
    });
});

utils.get('/page/:id', ensureAuthenticated, (req, res) => {
    db.get('SELECT * FROM Pages WHERE id = ?', req.params.id, (err, page) => {
        res.json(page);
    });
});
