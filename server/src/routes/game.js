const express = require('express');
const router = express.Router();
const { spin, leaderboard, history } = require('../controllers/gameController');
const { authenticate } = require('../middleware/authMiddleware');

// /api/game/spin (protected)
router.post('/spin', authenticate, spin);

// /api/game/leaderboard (public)
router.get('/leaderboard', leaderboard);

// /api/game/history (protected)
router.get('/history', authenticate, history);

module.exports = router;