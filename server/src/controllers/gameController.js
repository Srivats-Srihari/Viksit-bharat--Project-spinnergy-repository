// server/src/controllers/gameController.js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Handles incoming game data and returns feedback/suggestions
export const processGameData = async (req, res) => {
  try {
    const { energyPoints, username } = req.body;

    // Basic response if OpenAI is down or unreachable
    if (!client.apiKey) {
      return res.status(200).json({
        message: "OpenAI key not found. Using fallback response.",
        advice: `Good job, ${username}! You've earned ${energyPoints} points.`
      });
    }

    // Generate AI feedback
    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: `A player named ${username} has ${energyPoints} energy points. 
          Generate a short motivational message and one energy-saving tip.`
        }
      ]
    });

    const aiMessage =
      response.output[0]?.content[0]?.text ||
      `Great work, ${username}! You’ve collected ${energyPoints} points!`;

    res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error("Error in processGameData:", error);
    res.status(500).json({
      error: "Error processing game data",
      details: error.message
    });
  }
};
