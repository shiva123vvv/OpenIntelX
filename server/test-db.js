const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
    try {
        await prisma.$connect();
        console.log('✅ Database connection successful!');
    } catch (error) {
        console.error('❌ Database connection failed!');
        console.error('Error details:', error.message);
        console.log('\nTIP: Make sure PostgreSQL is running and the credentials in .env are correct.');
        console.log('TIP: You can create the database using: npx prisma migrate dev');
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
