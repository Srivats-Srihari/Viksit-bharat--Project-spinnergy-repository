// server/src/routes/game.js
import express from "express";
import { handleEnergyUpdate, handleTetrisEvent } from "../controllers/gameController.js";

const router = express.Router();

// Accept energy point data from Arduino/Microbit
router.post("/energy", handleEnergyUpdate);

// Accept Tetris event updates
router.post("/tetris", handleTetrisEvent);

export default router;
