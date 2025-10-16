const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');
const adminRoutes = require('./routes/admin');
const errorHandler = require('./middleware/errorHandler');
// server/src/index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import gameRouter from "./routes/game.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Routes
app.use("/api/game", gameRouter);

// Default root route
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/index.html");
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

dotenv.config();

const app = express();

// Connect to database
connectDB(process.env.MONGO_URI);

// Middlewares
app.use(helmet());
app.use(cors()); // Adjust origin as needed
app.use(express.json());

app.use(rateLimit({ windowMs: 60 * 1000, max: 100 })); // limit to 100 requests per minute

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/admin', adminRoutes);

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
