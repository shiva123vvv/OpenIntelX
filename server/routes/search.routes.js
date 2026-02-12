const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const searchController = require('../controllers/search.controller');
const { searchLimiter } = require('../middleware/rateLimiter');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

// POST /api/search - Perform OSINT search (supports both JSON and multipart/form-data)
router.post('/search', searchLimiter, upload.single('image'), searchController.search);

// GET /api/history - Retrieve recent search history
router.get('/history', searchController.getHistory);

module.exports = router;
