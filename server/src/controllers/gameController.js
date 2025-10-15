const { Configuration, OpenAIApi } = require('openai');
const User = require('../models/User');

// Configure OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY || ''
});
const openai = new OpenAIApi(configuration);

// POST /api/game/spin
exports.spin = async (req, res) => {
  try {
    const user = req.user;
    // Check if user has spins left
    if (user.spinsLeft <= 0) {
      return res.status(400).json({ message: 'No spins left' });
    }
    // Define possible spins and their rewards
    const segments = [10, 20, 30, 40, 50, 100];
    // Random index
    const idx = Math.floor(Math.random() * segments.length);
    const points = segments[idx];
    // Update user score and history
    user.score += points;
    user.spinsLeft -= 1;
    user.history.push({ points, date: new Date() });
    await user.save();
    // Calculate wheel rotation so that pointer lands on selected segment
    const degreesPerSegment = 360 / segments.length;
    const landingRotation = 360 * 5 + idx * degreesPerSegment + degreesPerSegment / 2;
    // Use OpenAI to generate a fun message (optional)
    let message = '';
    if (process.env.OPENAI_API_KEY) {
      try {
        const prompt = `You are a game host. Congratulate the user for winning ${points} points on the spinning wheel in a fun way.`;
        const aiRes = await openai.createCompletion({
          model: 'text-davinci-003',
          prompt,
          max_tokens: 20,
        });
        message = aiRes.data.choices[0].text.trim();
      } catch (aiError) {
        console.error('OpenAI API error:', aiError.message);
      }
    }
    res.json({
      value: points,
      newScore: user.score,
      landingRotation,
      message
    });
  } catch (err) {
    res.status(500).json({ message: 'Spin error' });
  }
};

// GET /api/game/leaderboard
exports.leaderboard = async (req, res) => {
  try {
    const topUsers = await User.find().sort({ score: -1 }).limit(10).select('name score');
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch leaderboard' });
  }
};

// GET /api/game/history
exports.history = async (req, res) => {
  // Return user's spin history
  try {
    res.json(req.user.history);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};