const axios = require('axios');
const crypto = require('crypto');

// Configuration
const TIMEOUT = 10000; // 10 seconds for API lookups

/**
 * --------------------------------------------------------------------------
 * EMAIL INTELLIGENCE
 * --------------------------------------------------------------------------
 */

/**
 * Check for email reputation using EmailRep.io
 * Free Tier: 50 requests/day without key, more with key.
 */
const checkEmailReputation = async (email) => {
    console.log(`[OSINT Service] Calling EmailRep.io for ${email}`);
    try {
        const config = {
            timeout: TIMEOUT,
            headers: { 'User-Agent': 'OpenIntelX-Research-Portal' }
        };

        // Add API key if available
        if (process.env.EMAILREP_API_KEY) {
            config.headers['Key'] = process.env.EMAILREP_API_KEY;
        }

        const response = await axios.get(`https://emailrep.io/${email}`, config);
        return response.data;
    } catch (error) {
        console.error(`[OSINT Service] EmailRep API Error: ${error.message}`);
        return { reputation: 'unknown', details: 'API Limit or Connectivity Issue' };
    }
};

/**
 * Verify email existence using Hunter.io
 * Free Tier: 25 requests/month.
 */
const checkHunterVerify = async (email) => {
    const apiKey = process.env.HUNTER_API_KEY;
    if (!apiKey) return { status: 'skipped', reason: 'No API Key' };

    try {
        const response = await axios.get(`https://api.hunter.io/v2/email-verifier?email=${email}&api_key=${apiKey}`, {
            timeout: TIMEOUT
        });
        return response.data.data;
    } catch (error) {
        return { status: 'error', message: error.message };
    }
};

/**
 * HaveIBeenPwned Range API (FREE & Anonymous)
 * Uses k-Anonymity model: sends first 5 chars of SHA-1 hash.
 */
const checkHIBPBreach = async (email) => {
    try {
        const hash = crypto.createHash('sha1').update(email.toLowerCase()).digest('hex').toUpperCase();
        const prefix = hash.slice(0, 5);
        const suffix = hash.slice(5);

        const response = await axios.get(`https://api.pwnedpasswords.com/range/${prefix}`, { timeout: TIMEOUT });
        const lines = response.data.split('\n');

        const match = lines.find(line => line.startsWith(suffix));
        if (match) {
            const count = parseInt(match.split(':')[1]);
            return { breached: true, count: count };
        }
        return { breached: false, count: 0 };
    } catch (error) {
        return { breached: false, count: 0, error: 'HIBP Service Unavailable' };
    }
};

/**
 * Gravatar Profile Discovery
 */
const checkGravatar = async (email) => {
    try {
        const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
        const response = await axios.get(`https://en.gravatar.com/${hash}.json`, { timeout: TIMEOUT });
        return response.data.entry[0];
    } catch (error) {
        return null;
    }
};

/**
 * --------------------------------------------------------------------------
 * PHONE INTELLIGENCE
 * --------------------------------------------------------------------------
 */

/**
 * NumVerify API 
 * Free Tier: 100 requests/month.
 */
const lookupPhone = async (phone) => {
    const apiKey = process.env.NUMVERIFY_API_KEY;
    if (!apiKey) {
        return {
            valid: true,
            number: phone,
            carrier: "Unknown Carrier (No API Key)",
            location: "Regional Lookup Unavailable",
            type: "mobile/landline"
        };
    }

    try {
        const response = await axios.get(`http://apilayer.net/api/validate?access_key=${apiKey}&number=${phone}`, {
            timeout: TIMEOUT
        });
        const data = response.data;
        return {
            valid: data.valid,
            number: data.number,
            carrier: data.carrier || 'Unknown',
            location: `${data.location}, ${data.country_name}`,
            type: data.line_type
        };
    } catch (error) {
        return { valid: false, error: error.message };
    }
};

/**
 * --------------------------------------------------------------------------
 * USERNAME INTELLIGENCE (Sherlock Lite)
 * --------------------------------------------------------------------------
 */

const SOCIAL_PLATFORMS = [
    { name: 'GitHub', url: 'https://github.com/', icon: 'si-github' },
    { name: 'Twitter', url: 'https://twitter.com/', icon: 'si-x' },
    { name: 'Instagram', url: 'https://instagram.com/', icon: 'si-instagram' },
    { name: 'Reddit', url: 'https://reddit.com/user/', icon: 'si-reddit' },
    { name: 'Pinterest', url: 'https://pinterest.com/', icon: 'si-pinterest' },
    { name: 'Steam', url: 'https://steamcommunity.com/id/', icon: 'si-steam' }
];

const checkUsernamePlatforms = async (username) => {
    const results = await Promise.all(SOCIAL_PLATFORMS.map(async (platform) => {
        try {
            const response = await axios.get(`${platform.url}${username}`, {
                timeout: 4000,
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' },
                validateStatus: (status) => status < 500
            });
            return {
                platform: platform.name,
                exists: response.status === 200,
                url: `${platform.url}${username}`
            };
        } catch (error) {
            return { platform: platform.name, exists: false };
        }
    }));
    return results.filter(r => r.exists);
};

module.exports = {
    checkEmailReputation,
    checkHunterVerify,
    checkHIBPBreach,
    checkGravatar,
    lookupPhone,
    checkUsernamePlatforms
};
