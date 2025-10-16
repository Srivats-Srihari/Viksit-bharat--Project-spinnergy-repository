// server/src/routes/game.js
import express from "express";
import { processGameData } from "../controllers/gameController.js";

const router = express.Router();

// POST endpoint for game data submission
router.post("/submit", processGameData);

export default router;
