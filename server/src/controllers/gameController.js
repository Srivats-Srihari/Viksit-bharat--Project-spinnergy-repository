// server/src/controllers/gameController.js
import OpenAI from "openai";
import fetch from "node-fetch";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Example in-memory leaderboard (Mongo optional)
let leaderboard = [];

// Utility to generate motivational message
async function getMotivation(energy, score) {
  try {
    const prompt = `A user just earned ${energy} energy points and scored ${score} in Spinnergy. 
    Write a 1-line futuristic motivational message.`;

    const chat = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return chat.choices[0].message.content.trim();
  } catch (err) {
    console.error("OpenAI API error:", err);
    return "Keep the energy flowing!";
  }
}

// POST /api/game/update
export async function updateGameData(req, res) {
  try {
    const { username, energy, score } = req.body;

    if (!username) return res.status(400).json({ error: "Missing username" });

    const msg = await getMotivation(energy, score);

    // Add to leaderboard (replace with DB in production)
    leaderboard.push({ username, energy, score, message: msg, time: new Date() });
    leaderboard = leaderboard.sort((a, b) => b.energy - a.energy).slice(0, 10);

    res.json({
      status: "success",
      message: msg,
      leaderboard,
    });
  } catch (err) {
    console.error("Error in updateGameData:", err);
    res.status(500).json({ error: "Server error" });
  }
}

// GET /api/game/leaderboard
export async function getLeaderboard(req, res) {
  res.json({ leaderboard });
}
