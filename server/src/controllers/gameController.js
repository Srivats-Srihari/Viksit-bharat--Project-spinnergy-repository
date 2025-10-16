const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const processGameData = async (req, res) => {
  try {
    const { energyPoints, username } = req.body;

    if (!client.apiKey) {
      return res.status(200).json({
        message: `Great effort, ${username}! You gained ${energyPoints} points.`,
      });
    }

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "user",
          content: `Player ${username} has ${energyPoints} energy points. 
          Give one-line motivation and one eco-friendly tip.`,
        },
      ],
    });

    const msg =
      response.output[0]?.content[0]?.text ||
      `Nice work ${username}! You have ${energyPoints} energy points.`;

    res.status(200).json({ message: msg });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { processGameData };
