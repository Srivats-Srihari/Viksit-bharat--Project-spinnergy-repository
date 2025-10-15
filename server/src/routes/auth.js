const express = require('express');
const router = express.Router();
const { register, login, profile } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

// /api/auth/register
router.post('/register', register);

// /api/auth/login
router.post('/login', login);

// /api/auth/profile (protected)
router.get('/profile', authenticate, profile);

module.exports = router;