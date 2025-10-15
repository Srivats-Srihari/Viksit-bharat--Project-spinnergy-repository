const mongoose = require('mongoose');

const SpinHistorySchema = new mongoose.Schema({
  points: Number,
  date: { type: Date, default: Date.now }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  spinsLeft: { type: Number, default: 5 }, // e.g., 5 spins per day
  history: [SpinHistorySchema]
});

module.exports = mongoose.model('User', UserSchema);