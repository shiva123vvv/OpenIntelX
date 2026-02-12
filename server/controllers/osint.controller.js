const NodeCache = require('node-cache');
const emailService = require('../services/email.service');
const phoneService = require('../services/phone.service');
const usernameService = require('../services/username.service');
const newsService = require('../services/news.service');

// Cache for 10 minutes (600 seconds)
const cache = new NodeCache({ stdTTL: 600 });

/**
 * Main OSINT Search Controller - Clean & Chained Intelligence
 */
exports.search = async (req, res) => {
    let { email, phone, username, name } = req.body;
    console.log('[OSINT Controller] Global Search Initialization:', { email, phone, username, name });

    // 1. Chained Intelligence Logic
    // If only email is provided, we extract the username for social media search
    if (email && !username) {
        username = email.split('@')[0];
        console.log(`[OSINT Controller] Extracting username '${username}' from email for social discovery.`);
    }

    // 2. Validation
    if (!email && !phone && !username && !name) {
        return res.status(400).json({ error: 'Identification node required (Email, Phone, Username, or Name).' });
    }

    // 3. Cache Check
    const cacheKey = JSON.stringify({ email, phone, username, name });
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
        return res.status(200).json(cachedData);
    }

    try {
        console.log(`[OSINT Controller] Initiating multi-node parallel scan...`);

        // 4. Parallel Execution with Intelligence Guardrails
        const [emailInt, phoneInt, usernameInt, nameInt] = await Promise.allSettled([
            email ? emailService.getEmailIntelligence(email) : Promise.resolve(null),
            phone ? phoneService.getPhoneIntelligence(phone) : Promise.resolve(null),
            username ? usernameService.getUsernameIntelligence(username) : Promise.resolve(null),
            name ? newsService.getNameIntelligence(name) : Promise.resolve(null)
        ]);

        // 5. Build Unified Intelligence Report
        const response = {
            status: 'success',
            email_intelligence: emailInt.status === 'fulfilled' ? emailInt.value : { status: 'error' },
            phone_intelligence: phoneInt.status === 'fulfilled' ? phoneInt.value : { status: 'error' },
            username_intelligence: usernameInt.status === 'fulfilled' ? usernameInt.value : { status: 'error' },
            name_intelligence: nameInt.status === 'fulfilled' ? nameInt.value : { status: 'error' },
            disclaimer: "Data shown is collected from publicly available sources only.",
            timestamp: new Date().toISOString(),
            target: email || phone || username || name
        };

        // Cache successful report
        cache.set(cacheKey, response);

        console.log('[OSINT Controller] Intelligence Report Finalized.');
        res.status(200).json(response);

    } catch (error) {
        console.error(`[OSINT Controller] System Failure: ${error.message}`);
        res.status(500).json({
            status: 'error',
            error: 'Investigation protocol failed.',
            details: error.message
        });
    }
};

/**
 * Get Search History
 */
exports.getHistory = async (req, res) => {
    try {
        // Since we removed Prisma for now or are doing a clean rebuild, 
        // return empty array if DB isn't configured, or implement simple JSON file logging.
        res.status(200).json([]);
    } catch (error) {
        res.status(200).json([]);
    }
};
