const express = require('express');
const router = express.Router();
const { login, authenticate } = require('../controllers/authController');

// Public route
router.post('/login', login);

// Protected route
router.get('/protected', authenticate, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
