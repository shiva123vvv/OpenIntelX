/**
 * Calculate risk score and level based on a broad spectrum of OSINT signals
 * 
 * Base score = 10
 * 
 * Signals:
 * - Breach Count (HIBP) → 1-3: +30, 4+: +50
 * - Social Presence → 0: +20 (Shadowy), 1-2: +5, 3+: -5 (Doxxed/Public)
 * - Reputation (EmailRep) → Suspicious: +40, Malicious: +60
 * - Domain Status → Expiring soon/New: +15
 */
const calculateRiskScore = (data) => {
    let score = 15; // Starting base

    // 1. Breaches
    if (data.breachCount > 0) {
        score += data.breachCount > 3 ? 50 : 30;
    }

    // 2. Social Footprint (Inversely related to risk in terms of anonymity)
    const profileCount = data.profiles ? data.profiles.length : 0;
    if (profileCount === 0) {
        score += 20; // High anonymity can be a risk signal in some contexts
    } else if (profileCount > 4) {
        score -= 10; // High social footprint decreases risk of being a "ghost" account
    }

    // 3. Email/IP Reputation
    if (data.reputation) {
        if (data.reputation === 'suspicious') score += 35;
        if (data.reputation === 'malicious') score += 60;
    }

    // Cap at 100
    score = Math.min(Math.max(score, 0), 100);

    let level = 'SECURE';
    if (score >= 75) {
        level = 'CRITICAL';
    } else if (score >= 45) {
        level = 'WARNING';
    } else if (score >= 25) {
        level = 'ELEVATED';
    }

    return {
        riskScore: score,
        riskLevel: level
    };
};

module.exports = { calculateRiskScore };
