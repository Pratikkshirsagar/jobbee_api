const express = require('express');
const router = express.Router();
const { registerUser, login } = require('../controllers/authController');

router.route('/register').post(registerUser);
router.post('/login', login);

module.exports = router;
