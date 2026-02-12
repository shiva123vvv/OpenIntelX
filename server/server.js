require('dotenv').config();
const app = require('./app');
const http = require('http');

const server = http.createServer(app);

const PORT = process.env.PORT || 5001;
const ENV = process.env.NODE_ENV || 'development';

server.listen(PORT, () => {
    console.log('\x1b[36m%s\x1b[0m', '========================================');
    console.log('\x1b[32m%s\x1b[0m', `  OpenIntelX - OSINT Backend (Live)`);
    console.log('\x1b[33m%s\x1b[0m', `  Port: ${PORT}`);
    console.log('\x1b[33m%s\x1b[0m', `  Mode: ${ENV}`);
    console.log('\x1b[35m%s\x1b[0m', `  Abstract Email API: ${process.env.ABSTRACT_EMAIL_API_KEY ? 'READY' : 'MISSING'}`);
    console.log('\x1b[35m%s\x1b[0m', `  Abstract Phone API: ${process.env.ABSTRACT_PHONE_API_KEY ? 'READY' : 'MISSING'}`);
    console.log('\x1b[36m%s\x1b[0m', '========================================');
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
    console.error(`Unhandled Rejection: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
