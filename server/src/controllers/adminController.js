const User = require('../models/User');

// GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('name email score isAdmin');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};