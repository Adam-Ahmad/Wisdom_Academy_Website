require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
connectDB();

app.use(helmet());

// app.use('/api/auth', authRouter);

app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));


// Configure loose CORS for development and production stability
app.use(cors({
  origin: '*', // Allows requests from any frontend origin during debugging
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Explicitly catch all pre-flight OPTIONS requests
app.options('*', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

// Global Error Handler (Prevents serverless crashes from dropping headers)
app.use((err, req, res, next) => {
  console.error("CRITICAL BACKEND ERROR: ", err.stack);
  res.setHeader("Access-Control-Allow-Origin", "*"); // Keeps browser happy
  res.status(500).json({ 
    error: true, 
    message: "Internal server error occurred.",
    details: err.message 
  });
});


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorMiddleware);

module.exports = app;