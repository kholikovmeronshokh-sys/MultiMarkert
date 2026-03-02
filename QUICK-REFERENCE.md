# MultiMarket 2026 - Quick Reference Card

## 🚀 Start Application
```bash
npm run dev
```
Access: http://localhost:5173

## 🛑 Stop Application
```
Ctrl + C (in terminal)
```

## 🔧 Troubleshooting

### Server won't start (EADDRINUSE)
```bash
taskkill /F /IM node.exe
npm run dev
```

### Crypto prices not showing
1. Check server logs for "✅ Fetched X cryptocurrencies"
2. Open browser console (F12)
3. Look for "Received crypto prices" message

### Trending NFTs not showing
- Expected: NFTScan API returns 401
- Mock data should display automatically
- Check browser console for errors

## 📁 Important Files

| File | Purpose |
|------|---------|
| `.env` | API keys and configuration |
| `multimarket.db` | SQLite database |
| `uploads/` | NFT images |
| `server/index.js` | Backend server |
| `client/src/App.jsx` | Frontend app |

## 🔑 Admin Account
**Email:** kholikovmeronshokh@gmail.com  
**Feature:** Unlimited NFT creation

## 📊 Real-Time Updates

| Feature | Update Frequency |
|---------|-----------------|
| Crypto Prices | 30 seconds |
| NFT Marketplace | 10 seconds |
| Trending NFTs | 30 seconds |
| Chat Messages | Instant |

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### NFT
- `GET /api/nft/all` - All NFTs
- `POST /api/nft/create` - Create NFT
- `POST /api/nft/buy/:id` - Buy NFT
- `POST /api/nft/rate/:id` - Rate NFT

### Chat
- `GET /api/chat/:nftId` - Get messages
- `POST /api/chat/:nftId` - Send message

## 🚢 Deployment Commands

### Update API URLs for Production
```bash
node update-api-urls.js https://your-backend-url.com
```

### Build Frontend
```bash
cd client
npm run build
```

### Check System Status
```bash
npm run check
```

## 📝 NPM Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both servers |
| `npm run server` | Backend only |
| `npm run client` | Frontend only |
| `npm run build` | Build for production |
| `npm run check` | System health check |
| `npm run update-urls` | Update API URLs |

## 🔍 Verify Everything Works

### Server Logs Should Show:
```
✅ Server running on port 5000
✅ Fetched 100 cryptocurrencies from Coinranking
📤 Emitted crypto prices to all connected clients
✅ New client connected: [socket-id]
```

### Browser Should Show:
- 100 cryptocurrencies with prices
- Sparkline charts
- NFT marketplace
- Trending collections (mock data)
- Working authentication

## 📚 Documentation

| File | Content |
|------|---------|
| `README.md` | Project overview |
| `START.md` | Complete setup guide |
| `DEPLOY.md` | Deployment instructions |
| `FIXES-APPLIED.md` | Changelog |

## 🆘 Quick Fixes

### Reset Everything
```bash
# Kill all node processes
taskkill /F /IM node.exe

# Reinstall dependencies
npm run install-all

# Start fresh
npm run dev
```

### Clear Database
```bash
# Delete database file
del multimarket.db

# Restart server (will recreate)
npm run dev
```

### Clear Uploads
```bash
# Delete all uploads except .gitkeep
cd uploads
del /Q *.*
# Keep .gitkeep file
```

## 🎯 Success Indicators

✅ Server running on port 5000  
✅ Frontend on port 5173  
✅ 100 crypto prices loading  
✅ Socket.io connected  
✅ NFT marketplace visible  
✅ Trending NFTs showing  
✅ Chat working  
✅ Profile page loading  

## 🔗 Useful URLs

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Test: http://localhost:5000/api/nft/all

## 💡 Pro Tips

1. **Multiple Tabs:** Open app in multiple tabs to test real-time features
2. **Admin Testing:** Register with admin email for unlimited NFT creation
3. **Chat Testing:** Buy an NFT to test real-time chat
4. **Mobile Testing:** Use browser dev tools to test responsive design

## 🐛 Common Errors

| Error | Solution |
|-------|----------|
| EADDRINUSE | `taskkill /F /IM node.exe` |
| Cannot find module | `npm install` |
| Port already in use | Kill node processes |
| Database locked | Close other connections |
| Upload failed | Check uploads folder exists |

## 📞 Need Help?

1. Check server logs in terminal
2. Check browser console (F12)
3. Read START.md for detailed guide
4. Read DEPLOY.md for deployment help
5. Check FIXES-APPLIED.md for known issues

---

**Keep this file handy for quick reference!** 📌
