// System Status Checker for MultiMarket 2026
// Usage: node check-status.js

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const BACKEND_URL = 'http://localhost:5000';
const FRONTEND_URL = 'http://localhost:5173';

console.log('🔍 MultiMarket 2026 - System Status Check\n');
console.log('═'.repeat(50));

// Check if .env file exists
console.log('\n📄 Environment Configuration:');
if (fs.existsSync('.env')) {
  console.log('   ✅ .env file found');
  const envContent = fs.readFileSync('.env', 'utf8');
  const requiredVars = [
    'PORT',
    'JWT_SECRET',
    'COINRANKING_API_KEY',
    'COINGECKO_API_KEY',
    'NFTSCAN_API_KEY',
    'ADMIN_EMAIL'
  ];
  
  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      console.log(`   ✅ ${varName} configured`);
    } else {
      console.log(`   ❌ ${varName} missing`);
    }
  });
} else {
  console.log('   ❌ .env file not found');
}

// Check if database exists
console.log('\n💾 Database:');
if (fs.existsSync('multimarket.db')) {
  const stats = fs.statSync('multimarket.db');
  console.log(`   ✅ SQLite database found (${(stats.size / 1024).toFixed(2)} KB)`);
} else {
  console.log('   ⚠️  Database will be created on first run');
}

// Check uploads folder
console.log('\n📁 File Storage:');
if (fs.existsSync('uploads')) {
  const files = fs.readdirSync('uploads').filter(f => f !== '.gitkeep');
  console.log(`   ✅ Uploads folder exists (${files.length} files)`);
} else {
  console.log('   ❌ Uploads folder missing');
}

// Check if node_modules exist
console.log('\n📦 Dependencies:');
if (fs.existsSync('node_modules')) {
  console.log('   ✅ Root dependencies installed');
} else {
  console.log('   ❌ Root dependencies not installed (run: npm install)');
}

if (fs.existsSync('client/node_modules')) {
  console.log('   ✅ Client dependencies installed');
} else {
  console.log('   ❌ Client dependencies not installed (run: cd client && npm install)');
}

// Check backend server
console.log('\n🖥️  Backend Server:');
axios.get(`${BACKEND_URL}/api/nft/all`)
  .then(response => {
    console.log(`   ✅ Backend is running on ${BACKEND_URL}`);
    console.log(`   ✅ API responding (${response.status})`);
  })
  .catch(error => {
    if (error.code === 'ECONNREFUSED') {
      console.log(`   ❌ Backend not running on ${BACKEND_URL}`);
      console.log('   💡 Start with: npm run dev');
    } else {
      console.log(`   ⚠️  Backend error: ${error.message}`);
    }
  })
  .finally(() => {
    // Check frontend
    console.log('\n🌐 Frontend:');
    axios.get(FRONTEND_URL)
      .then(response => {
        console.log(`   ✅ Frontend is running on ${FRONTEND_URL}`);
        console.log(`   ✅ Vite dev server responding (${response.status})`);
      })
      .catch(error => {
        if (error.code === 'ECONNREFUSED') {
          console.log(`   ❌ Frontend not running on ${FRONTEND_URL}`);
          console.log('   💡 Start with: npm run dev');
        } else {
          console.log(`   ⚠️  Frontend error: ${error.message}`);
        }
      })
      .finally(() => {
        console.log('\n' + '═'.repeat(50));
        console.log('\n📊 Summary:');
        console.log('   If all checks pass, your system is ready!');
        console.log('   If any checks fail, follow the suggestions above.');
        console.log('\n📚 Documentation:');
        console.log('   - Quick Start: START.md');
        console.log('   - Deployment: DEPLOY.md');
        console.log('   - Full Guide: README.md');
        console.log('\n🚀 To start the application:');
        console.log('   npm run dev');
        console.log('\n');
      });
  });
