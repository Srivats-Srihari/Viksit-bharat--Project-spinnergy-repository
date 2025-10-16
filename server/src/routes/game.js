const express = require("express");
const { processGameData } = require("../controllers/gameController");

const router = express.Router();

router.post("/submit", processGameData);

module.exports = router; // <---- THIS is critical
