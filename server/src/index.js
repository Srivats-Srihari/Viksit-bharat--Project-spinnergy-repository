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
