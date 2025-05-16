const path = require('path');
const express = require('express');

const auth = express.Router();
module.exports = auth;

auth.use('/login', require(path.join(__dirname, 'auth', 'login')));
auth.use('/logout', require(path.join(__dirname, 'auth', 'logout')));
