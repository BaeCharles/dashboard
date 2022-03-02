const express = require('express');
const router = express.Router();
const authController = require('@controller/auth');

router.get('/', function(req, res, next) {
    authController.renderLogin(req, res);
});

module.exports = router;