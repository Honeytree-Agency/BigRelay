const path = require('path');
const express = require('express');
const slugify = require('slugify');
const { marked } = require('marked');
const sanitizeHTML = require('sanitize-html');

const create = express.Router();
module.exports = create;

const db = require(path.join(__dirpath, 'data', 'db'));
const { ensureAuthenticated } = require(path.join(__dirpath, 'utils', 'auth'));

create.post('/', ensureAuthenticated, (req, res) => {
    const { title, content } = req.body;

    const compiled = sanitizeHTML(
        marked.parse(content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '').replace('\r\n', '\n'), {
            mangle: false,
            headerIds: false,
        }),
    );

    const updated_at = new Date().getTime();
    const updated_at_str = new Date(updated_at).toLocaleString();
    const created_at = updated_at;
    const created_at_str = updated_at_str;

    let slug = slugify(title, {
        lower: true,
        strict: true,
    });

    db.get('SELECT * FROM Pages WHERE slug = ?', slug, (err, page) => {
        if (page) slug += '-' + nanoid(3);

        db.run(
            'INSERT INTO Pages (slug, title, content, compiled, updated_at, updated_at_str, created_at, created_at_str) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [slug, title, content, compiled, updated_at, updated_at_str, created_at, created_at_str],
            (err) => {
                res.redirect('/dash/content');
            },
        );
    });
});
