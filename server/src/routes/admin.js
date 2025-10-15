const express = require('express');
const router = express.Router();
const { getUsers } = require('../controllers/adminController');
const { authenticate, requireAdmin } = require('../middleware/authMiddleware');

// /api/admin/users (admin only)
router.get('/users', authenticate, requireAdmin, getUsers);

module.exports = router;