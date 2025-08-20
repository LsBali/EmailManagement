#!/usr/bin/env node

// Development startup script
process.env.NODE_ENV = 'development';
process.env.SERVE_FRONTEND = 'false';
process.env.PORT = '5001'; // Use different port to avoid conflicts

console.log('Starting backend in development mode...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('SERVE_FRONTEND:', process.env.SERVE_FRONTEND);
console.log('Backend will run on port 5001');
console.log('Frontend should be accessed on port 8080');
console.log('');

// Start the app
require('./app.js');
