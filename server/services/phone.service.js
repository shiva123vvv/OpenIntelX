const axios = require('axios');

const TIMEOUT = 8000;

/**
 * Abstract Phone Intelligence (User's specific API)
 */
const checkAbstractPhone = async (phone) => {
    const apiKey = process.env.ABSTRACT_PHONE_API_KEY;
    console.log(`[Phone Service] Abstract Intelligence Scan: ${phone}`);

    if (!apiKey) return { status: 'skipped' };

    try {
        // Updated to use phoneintelligence instead of phonevalidation as per user's keys
        const response = await axios.get(`https://phoneintelligence.abstractapi.com/v1/?api_key=${apiKey}&phone=${phone}`, {
            timeout: TIMEOUT
        });

        console.log('[Phone Service] Abstract Response:', response.data);

        return {
            status: 'success',
            country: response.data.country?.name || 'Unknown',
            carrier: response.data.carrier || 'Unknown',
            line_type: response.data.type || 'Unknown',
            valid: response.data.valid ?? true
        };
    } catch (error) {
        console.error(`[Phone Service] Abstract Error: ${error.message}`);
        return { status: 'error', error: error.message };
    }
};

/**
 * NumVerify Phone Lookup
 */
const checkNumVerify = async (phone) => {
    const apiKey = process.env.NUMVERIFY_API_KEY;
    if (!apiKey) return { status: 'skipped' };

    try {
        const response = await axios.get(`http://apilayer.net/api/validate?access_key=${apiKey}&number=${phone}`, {
            timeout: TIMEOUT
        });
        return {
            status: 'success',
            country_code: response.data.country_code,
            carrier: response.data.carrier,
            location: response.data.location
        };
    } catch (error) {
        return { status: 'error', error: error.message };
    }
};

const getPhoneIntelligence = async (phone) => {
    const [abstract, numverify] = await Promise.allSettled([
        checkAbstractPhone(phone),
        checkNumVerify(phone)
    ]);

    return {
        abstract: abstract.status === 'fulfilled' ? abstract.value : { status: 'error' },
        numverify: numverify.status === 'fulfilled' ? numverify.value : { status: 'error' }
    };
};

module.exports = { getPhoneIntelligence };
