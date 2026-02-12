const express = require('express');
const router = express.Router();
const osintController = require('../controllers/osint.controller');
const { RateLimiterMemory } = require('rate-limiter-flexible');

// Rate limiter: 10 requests per minute per IP
const rateLimiter = new RateLimiterMemory({
    points: 10,
    duration: 60, // per 60 seconds
});

const rateLimitMiddleware = (req, res, next) => {
    rateLimiter.consume(req.ip)
        .then(() => {
            next();
        })
        .catch(() => {
            res.status(429).json({ error: 'Too many requests, please try again after a minute.' });
        });
};

/**
 * @route POST /api/osint/search
 * @desc Initialize deep OSINT scan
 * @access Public
 */
router.post('/search', rateLimitMiddleware, osintController.search);

module.exports = router;
