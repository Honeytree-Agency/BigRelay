const fs = require('fs');
const path = require('path');
const express = require('express');

const home = express.Router();
module.exports = home;

const db = require(path.join(__dirname, '..', 'data', 'db'));

home.get('/', (req, res) => {
    db.all('SELECT * FROM Settings', (err, settings) => {
        let the_settings = {};

        settings.forEach((setting) => {
            const the_setting = setting.setting;
            const the_value = setting.value;

            the_settings[the_setting] = the_value;
        });

        fs.readFile(path.join(__dirpath, 'domains.json'), { encoding: 'utf-8' }, (err, data) => {
            const connections = JSON.parse(data);
            const updated_amount = Math.round(
                (new Date().getTime() - new Date(connections.updated_at).getTime()) / 1000 / 60,
            );
            const updated_modifier = updated_amount > 1 ? 'minutes' : 'minute';

            res.render('home', {
                settings: the_settings,
                connections,
                updated_amount,
                updated_modifier,
            });
        });
    });
});
