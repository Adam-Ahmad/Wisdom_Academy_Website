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
// { origin: process.env.CLIENT_URL, credentials: true }
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/registrations', require('./routes/registrationRoutes'));
app.use('/api/users', require('./routes/userRoutes'));


app.use(errorMiddleware);
module.exports = app;