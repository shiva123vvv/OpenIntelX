const crypto = require('crypto');

/**
 * Generate Gravatar URL from email
 * @param {string} email 
 * @returns {Object}
 */
const getGravatar = (email) => {
    const hash = crypto.createHash('md5').update(email.trim().toLowerCase()).digest('hex');
    return {
        hash,
        url: `https://www.gravatar.com/avatar/${hash}?d=404`
    };
};

module.exports = { getGravatar };
