const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const osintService = require('../services/osint.service');
const { calculateRiskScore } = require('../utils/riskCalculator');

/**
 * Handle Live OSINT Intelligence Scan
 */
exports.search = async (req, res, next) => {
    let { type, value } = req.body;

    if (req.file) {
        type = 'image';
        value = req.file.path;
    }

    console.log(`[Portal Engine] Initializing LIVE Scan - Type: ${type}, Target: ${value}`);

    try {
        if (!type || !value) {
            return res.status(400).json({ error: 'Search parameters missing.' });
        }

        const startTime = Date.now();
        let intelligence = {
            profiles: [],
            breachCount: 0,
            reputation: 'neutral',
            rawData: {}
        };

        // --- LIVE INTEL ENGINES ---

        if (type === 'email') {
            const [hibpData, gravatarData, profileData, repData, hunterData] = await Promise.all([
                osintService.checkHIBPBreach(value),
                osintService.checkGravatar(value),
                osintService.checkUsernamePlatforms(value.split('@')[0]),
                osintService.checkEmailReputation(value),
                osintService.checkHunterVerify(value)
            ]);

            intelligence.breachCount = hibpData.count;
            intelligence.profiles = profileData;
            intelligence.reputation = repData?.reputation || 'neutral';

            // Enriching raw data for the investigator
            intelligence.rawData = {
                breaches: hibpData,
                identity: gravatarData,
                reputation: repData,
                verification: hunterData
            };

            if (gravatarData) {
                intelligence.profiles.push({
                    platform: 'Gravatar',
                    url: `https://gravatar.com/${value.split('@')[0]}`,
                    exists: true
                });
            }
        }

        else if (type === 'username') {
            const profiles = await osintService.checkUsernamePlatforms(value);
            intelligence.profiles = profiles;
            intelligence.rawData = { profiles };
        }

        else if (type === 'phone') {
            const phoneData = await osintService.lookupPhone(value);
            intelligence.rawData = { phoneData };

            // Check for breaches if phone data exists
            intelligence.breachCount = phoneData.valid ? 0 : 1;
            intelligence.profiles = [
                { platform: 'Carrier', url: '#', value: phoneData.carrier },
                { platform: 'Location', url: '#', value: phoneData.location },
                { platform: 'Line Type', url: '#', value: phoneData.type }
            ];
        }

        // --- INTELLIGENT RISK ANALYSIS ---

        const { riskScore, riskLevel } = calculateRiskScore({
            breachCount: intelligence.breachCount,
            profiles: intelligence.profiles,
            reputation: intelligence.reputation
        });

        const duration = Date.now() - startTime;
        console.log(`[Portal Engine] Scan Complete. Risk: ${riskLevel} (${riskScore}). Duration: ${duration}ms`);

        // --- AUDIT LOGGING (SILENT FAIL) ---
        let auditId = "audit-" + Date.now();
        try {
            const saved = await prisma.search.create({
                data: {
                    searchType: type,
                    searchValue: type === 'image' ? 'Image Binary' : value,
                    breachCount: intelligence.breachCount,
                    githubExists: intelligence.profiles.some(p => p.platform === 'GitHub'),
                    gravatarExists: intelligence.profiles.some(p => p.platform === 'Gravatar'),
                    riskScore,
                    riskLevel,
                    rawData: intelligence.rawData
                }
            });
            auditId = saved.id;
        } catch (e) {
            console.warn("[Portal Engine] Database Offline. Audit log skipped.");
        }

        // --- PORTAL RESPONSE ---
        res.status(200).json({
            id: auditId,
            type,
            value,
            riskScore,
            riskLevel,
            intelligence: {
                profiles: intelligence.profiles,
                breachCount: intelligence.breachCount,
                summary: `Investigative scan identified ${intelligence.profiles.length} linked digital footprints and ${intelligence.breachCount} data breach signals.`
            },
            rawData: intelligence.rawData,
            metadata: {
                duration: `${duration}ms`,
                timestamp: new Date().toISOString(),
                engine: "Pulse-OSINT-v2.5"
            }
        });

    } catch (error) {
        console.error(`[Portal Engine] Execution Failure: ${error.message}`);
        res.status(500).json({ error: 'Search protocol encountered an internal error.' });
    }
};

exports.getHistory = async (req, res, next) => {
    try {
        const history = await prisma.search.findMany({
            orderBy: { createdAt: 'desc' },
            take: 20
        });
        res.status(200).json(history);
    } catch (error) {
        res.status(200).json([]);
    }
};
