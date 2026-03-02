# MultiMarket 2026 - Quick Start Guide

## 🚀 Local Development

### Prerequisites
- Node.js v18+ installed
- npm or yarn package manager

### Installation & Running

1. **Install dependencies:**
```bash
npm install
```

2. **Start development servers:**
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:5173`

3. **Access the application:**
Open your browser and go to: `http://localhost:5173`

---

## 🔑 Admin Account

**Email:** kholikovmeronshokh@gmail.com  
**Password:** (set during registration)

Admin features:
- Unlimited NFT creation
- All regular user features

---

## 📋 Features

### ✅ Working Features

1. **Authentication System**
   - Email, name, password registration
   - JWT-based authentication
   - Admin and regular user roles

2. **Real-Time Crypto Market**
   - 100 cryptocurrencies from Coinranking API
   - Real-time price updates every 30 seconds
   - Sparkline charts for each crypto
   - Search functionality
   - Filter by All/Gainers/Losers
   - Market cap and 24h volume data

3. **NFT Marketplace**
   - Users can create 1 NFT (admin unlimited)
   - Upload images with Unsplash integration
   - Buy/sell system with real-time chat
   - Seller must "gift" NFT after payment discussion
   - Rating system (only buyers can rate after purchase)
   - Real-time marketplace updates every 10 seconds

4. **Trending NFT Collections**
   - NFTScan API integration (with mock data fallback)
   - Wallet NFT search feature
   - Collection statistics
   - Real-time updates every 30 seconds

5. **Real-Time Chat**
   - Socket.io powered chat for NFT transactions
   - Buyer-seller communication
   - Message history

6. **Profile Page**
   - User statistics
   - Created NFTs showcase
   - Purchased NFTs collection
   - Rating history

7. **Professional UI/UX**
   - 4K design with gold (#FFD700) and blue gradient
   - Glassmorphism effects
   - Smooth animations
   - Mobile responsive
   - Dark theme

---

## 🔧 Troubleshooting

### Server won't start (EADDRINUSE error)

Kill all node processes:
```bash
taskkill /F /IM node.exe
```

Then restart:
```bash
npm run dev
```

### Crypto prices not showing

1. Check server logs for "✅ Fetched X cryptocurrencies"
2. Check browser console for Socket.io connection
3. Verify COINRANKING_API_KEY in .env file

### Trending NFTs not showing

- NFTScan API may return 401 (Unauthorized)
- Mock data should display automatically
- Check browser console for errors

### NFT images not loading

- Ensure uploads folder exists
- Check file permissions
- Verify image was uploaded successfully

---

## 📁 Project Structure

```
multimarket/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── middleware/       # Auth middleware
│   └── index.js          # Server entry point
├── uploads/              # NFT image uploads
├── multimarket.db        # SQLite database
├── .env                  # Environment variables
└── package.json          # Root package.json
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### NFT
- `GET /api/nft/all` - Get all NFTs
- `GET /api/nft/user/:userId` - Get user's NFTs
- `POST /api/nft/create` - Create new NFT
- `POST /api/nft/buy/:id` - Buy NFT
- `POST /api/nft/confirm/:id` - Gift NFT to buyer
- `POST /api/nft/rate/:id` - Rate NFT

### Chat
- `GET /api/chat/:nftId` - Get chat messages
- `POST /api/chat/:nftId` - Send message

### Crypto
- Socket.io event: `cryptoPrices` - Real-time crypto prices

### Trending NFTs
- `GET /api/moralis/trending-collections` - Get trending collections
- `GET /api/moralis/wallet-nfts/:address` - Get wallet NFTs

---

## 🔐 Environment Variables

Required in `.env` file:

```env
PORT=5000
JWT_SECRET=multimarket_secret_key_2026_change_in_production
COINRANKING_API_KEY=your_coinranking_key
COINGECKO_API_KEY=your_coingecko_key
NFTSCAN_API_KEY=your_nftscan_key
MORALIS_API_KEY=your_moralis_key
FIGMA_CLIENT_ID=your_figma_client_id
FIGMA_CLIENT_SECRET=your_figma_client_secret
UNSPLASH_ACCESS_KEY=your_unsplash_key
ADMIN_EMAIL=kholikovmeronshokh@gmail.com
```

---

## 🚢 Deployment

See [DEPLOY.md](./DEPLOY.md) for detailed deployment instructions.

**Quick deployment options:**
1. Railway (backend) + Vercel (frontend) - RECOMMENDED
2. Render.com (full stack)
3. Full serverless on Vercel (requires architecture changes)

---

## 📝 Development Commands

```bash
# Install dependencies
npm install

# Start development (both frontend and backend)
npm run dev

# Start backend only
npm run server

# Start frontend only
npm run client

# Build frontend for production
cd client && npm run build

# Update API URLs for production
node update-api-urls.js https://your-backend-url.com
```

---

## 🐛 Known Issues

1. **NFTScan API 401 Error**
   - Status: Expected behavior
   - Solution: Mock data is used as fallback
   - Impact: Trending NFTs show sample data

2. **Multiple Server Instances**
   - Status: Fixed
   - Solution: Kill all node processes before starting
   - Command: `taskkill /F /IM node.exe`

3. **Vercel Deployment Limitations**
   - Status: Architecture incompatible
   - Solution: Use Railway for backend or refactor to serverless
   - See: DEPLOY.md for details

---

## 💡 Tips

1. **Testing Real-Time Features:**
   - Open app in multiple browser tabs
   - Create/buy NFTs in one tab
   - Watch updates in other tabs

2. **Admin Testing:**
   - Register with admin email
   - Create multiple NFTs
   - Test unlimited creation

3. **Chat Testing:**
   - Buy an NFT
   - Chat opens automatically
   - Test real-time messaging

4. **Performance:**
   - Crypto updates: 30 seconds
   - NFT marketplace: 10 seconds
   - Trending NFTs: 30 seconds

---

## 📞 Support

If you encounter issues:
1. Check server logs in terminal
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure only one server instance is running
5. Clear browser cache and reload

---

## 🎉 Success Indicators

When everything is working correctly, you should see:

**In Terminal:**
```
✅ Server running on port 5000
✅ Frontend: http://localhost:5173
✅ Backend: http://localhost:5000
✅ Fetched 100 cryptocurrencies from Coinranking
📤 Emitted crypto prices to all connected clients
✅ New client connected: [socket-id]
```

**In Browser:**
- Crypto prices updating every 30 seconds
- NFT marketplace showing all NFTs
- Trending collections displaying (mock data)
- Chat working in real-time
- Profile showing user data

---

## 🔄 Version

**MultiMarket 2026 v1.0.0**  
Built with React, Node.js, Express, Socket.io, SQLite
