const axios = require('axios');
const crypto = require('crypto');

const TIMEOUT = 8000; // Increased timeout for deep scans

/**
 * Have I Been Pwned check
 */
const checkHIBP = async (email) => {
    const apiKey = process.env.HIBP_API_KEY;
    console.log(`[Email Service] HIBP Scan: ${email}`);

    if (!apiKey) {
        console.warn('[Email Service] HIBP skipped: No API Key');
        return { status: 'skipped', error: 'Missing API Key' };
    }

    try {
        const response = await axios.get(`https://haveibeenpwned.com/api/v3/breachedaccount/${email}?truncateResponse=false`, {
            headers: {
                'hibp-api-key': apiKey,
                'user-agent': 'osint-portal'
            },
            timeout: TIMEOUT
        });

        return {
            status: 'success',
            breach_count: response.data.length,
            breaches: response.data.map(b => ({
                name: b.Name,
                breachDate: b.BreachDate,
                dataClasses: b.DataClasses
            }))
        };
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { status: 'success', breach_count: 0, breaches: [] };
        }
        console.error(`[Email Service] HIBP Error: ${error.message}`);
        return { status: 'error', error: error.message };
    }
};

/**
 * Abstract Email Reputation (User's specific API)
 */
const checkAbstractEmail = async (email) => {
    const apiKey = process.env.ABSTRACT_EMAIL_API_KEY;
    console.log(`[Email Service] Abstract Reputation Scan: ${email}`);

    if (!apiKey) return { status: 'skipped' };

    try {
        // Updated to use emailreputation instead of emailvalidation as per user's keys
        const response = await axios.get(`https://emailreputation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`, {
            timeout: TIMEOUT
        });

        console.log('[Email Service] Abstract Response:', response.data);

        return {
            status: 'success',
            is_valid_format: response.data.is_valid_format?.value ?? true,
            is_disposable: response.data.is_disposable_email?.value ?? false,
            domain: response.data.domain || email.split('@')[1],
            mx_records: response.data.is_mx_found?.value ?? true,
            reputation_score: response.data.reputation_score
        };
    } catch (error) {
        console.error(`[Email Service] Abstract Error: ${error.message}`);
        return { status: 'error', error: error.message };
    }
};

/**
 * Hunter.io Domain Search
 */
const checkHunter = async (email) => {
    const apiKey = process.env.HUNTER_API_KEY;
    const domain = email.split('@')[1];
    if (!apiKey || !domain) return { status: 'skipped' };

    const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
    if (commonDomains.includes(domain)) return { status: 'skipped', reason: 'Personal domain' };

    try {
        const response = await axios.get(`https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${apiKey}`, {
            timeout: TIMEOUT
        });
        return {
            status: 'success',
            organization: response.data.data.organization,
            pattern: response.data.data.pattern,
            public_emails: response.data.data.emails.slice(0, 5).map(e => e.value)
        };
    } catch (error) {
        return { status: 'error', error: error.message };
    }
};

/**
 * Gravatar Profile Check
 */
const getGravatarInfo = async (email) => {
    const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
    const url = `https://www.gravatar.com/avatar/${hash}?d=404`;

    try {
        await axios.head(url, { timeout: 3000 });
        return {
            status: 'success',
            avatar_exists: true,
            avatar_url: url
        };
    } catch (e) {
        return {
            status: 'success',
            avatar_exists: false,
            avatar_url: null
        };
    }
};

const getEmailIntelligence = async (email) => {
    const [hibp, abstract, hunter, gravatar] = await Promise.allSettled([
        checkHIBP(email),
        checkAbstractEmail(email),
        checkHunter(email),
        getGravatarInfo(email)
    ]);

    return {
        hibp: hibp.status === 'fulfilled' ? hibp.value : { status: 'error' },
        abstract: abstract.status === 'fulfilled' ? abstract.value : { status: 'error' },
        hunter: hunter.status === 'fulfilled' ? hunter.value : { status: 'error' },
        gravatar: gravatar.status === 'fulfilled' ? gravatar.value : { status: 'error' }
    };
};

module.exports = { getEmailIntelligence };
