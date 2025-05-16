const path = require('path');
const express = require('express');

const router = express.Router();
module.exports = router;

router.use('/', require(path.join(__dirname, 'routes', 'home')));
router.use('/auth', require(path.join(__dirname, 'routes', 'auth')));
router.use('/dash', require(path.join(__dirname, 'routes', 'dash')));
router.use(require(path.join(__dirname, 'routes', 'pages')));
