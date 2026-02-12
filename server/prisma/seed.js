const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const seedData = require('./seedData.json');

async function main() {
    console.log(`Start seeding ...`);
    for (const s of seedData) {
        const search = await prisma.search.create({
            data: {
                searchType: s.type,
                searchValue: s.value,
                breachCount: s.breachCount,
                socialProfilesFound: s.socialProfilesFound,
                riskScore: s.riskScore,
                createdAt: s.createdAt,
            },
        });
        console.log(`Created search with id: ${search.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
