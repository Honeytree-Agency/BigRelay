const path = require('path');
const express = require('express');
const { marked } = require('marked');
const sanitizeHTML = require('sanitize-html');

const update = express.Router();
module.exports = update;

const db = require(path.join(__dirpath, 'data', 'db'));
const { ensureAuthenticated } = require(path.join(__dirpath, 'utils', 'auth'));

update.post('/', ensureAuthenticated, (req, res) => {
    const { id, slug, title, content } = req.body;

    const compiled = sanitizeHTML(
        marked.parse(content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, '').replace('\r\n', '\n'), {
            mangle: false,
            headerIds: false,
        }),
    );

    const updated_at = new Date().getTime();
    const updated_at_str = new Date(updated_at).toLocaleString();

    db.run(
        'UPDATE Pages SET title = ?, slug = ?, content = ?, compiled = ?, updated_at = ?, updated_at_str = ? WHERE id = ?',
        [title, slug, content.replace('\r\n', '\n'), compiled, updated_at, updated_at_str, id],
        (err) => {
            res.redirect('/dash/content');
        },
    );
});
