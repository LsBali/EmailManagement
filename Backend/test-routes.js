#!/usr/bin/env node

// Simple test script to verify backend routes
const http = require('http');

const testRoutes = [
    '/health',
    '/api/employee/leave-email',
    '/employee/leave-email',
    '/api/auth/login',
    '/auth/login'
];

console.log('🧪 Testing backend routes...\n');

testRoutes.forEach(route => {
    const options = {
        hostname: 'localhost',
        port: 5001,
        path: route,
        method: 'GET'
    };

    const req = http.request(options, (res) => {
        console.log(`✅ ${route} - Status: ${res.statusCode}`);
    });

    req.on('error', (err) => {
        console.log(`❌ ${route} - Error: ${err.message}`);
    });

    req.end();
});

console.log('\n🎯 Test completed! Check the results above.');
console.log('💡 If you see errors, make sure the backend is running on port 5001');
