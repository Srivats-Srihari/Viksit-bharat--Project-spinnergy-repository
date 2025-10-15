const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User registration
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    // Create user
    const hashed = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashed });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h' });
    res.json({ token, user: { name: user.name, email: user.email, score: user.score, isAdmin: user.isAdmin } });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};

// Get current user profile
exports.profile = (req, res) => {
  // req.user is set by authMiddleware
  res.json({
    name: req.user.name,
    email: req.user.email,
    score: req.user.score,
    isAdmin: req.user.isAdmin,
    history: req.user.history
  });
};