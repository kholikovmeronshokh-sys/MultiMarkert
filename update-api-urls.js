// Script to update API URLs for production deployment
// Usage: node update-api-urls.js <your-backend-url>
// Example: node update-api-urls.js https://your-app.railway.app

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❌ Please provide your backend URL');
  console.log('Usage: node update-api-urls.js <backend-url>');
  console.log('Example: node update-api-urls.js https://your-app.railway.app');
  process.exit(1);
}

const backendUrl = args[0].replace(/\/$/, ''); // Remove trailing slash
const localUrl = 'http://localhost:5000';

const filesToUpdate = [
  'client/src/components/Auth.jsx',
  'client/src/components/CryptoMarket.jsx',
  'client/src/components/NFTMarket.jsx',
  'client/src/components/TrendingNFTs.jsx',
  'client/src/components/CreateNFT.jsx',
  'client/src/components/Profile.jsx',
  'client/src/components/ChatModal.jsx'
];

let updatedCount = 0;
let errorCount = 0;

console.log(`🔄 Updating API URLs from ${localUrl} to ${backendUrl}\n`);

filesToUpdate.forEach(filePath => {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Skipping ${filePath} (file not found)`);
      return;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Replace all occurrences of localhost URL
    content = content.replace(new RegExp(localUrl, 'g'), backendUrl);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated ${filePath}`);
      updatedCount++;
    } else {
      console.log(`ℹ️  No changes needed in ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Updated: ${updatedCount} files`);
console.log(`   Errors: ${errorCount} files`);

if (updatedCount > 0) {
  console.log(`\n✅ API URLs updated successfully!`);
  console.log(`   Backend URL: ${backendUrl}`);
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Deploy backend to Railway/Render`);
  console.log(`   2. Run: cd client && npm run build`);
  console.log(`   3. Deploy frontend to Vercel`);
} else {
  console.log(`\n⚠️  No files were updated. URLs might already be set.`);
}
