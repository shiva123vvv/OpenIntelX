const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const searchRoutes = require('./routes/search.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsing
app.use(express.json());

// Logging
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// API Routes
app.use('/api', searchRoutes);
app.use('/api/osint', require('./routes/osint.routes'));

// Error Handling (Must be last)
app.use(errorHandler);

module.exports = app;
