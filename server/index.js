const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

dotenv.config();

let db;

async function initDatabase() {
  const SQL = await initSqlJs();
  
  const dbPath = 'multimarket.db';
  let buffer;
  
  if (fs.existsSync(dbPath)) {
    buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      isAdmin INTEGER DEFAULT 0,
      nftLimit INTEGER DEFAULT 1,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nftId INTEGER NOT NULL,
      senderId INTEGER NOT NULL,
      message TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  setInterval(() => {
    const data = db.export();
    fs.writeFileSync(dbPath, data);
  }, 5000);

  console.log('SQLite database initialized');
}

const app = express();
const server = http.createServer(app);

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
].filter(Boolean);

const io = socketIo(server, {
  cors: {
    origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/auth');
const nftRoutes = require('./routes/nft');
const cryptoRoutes = require('./routes/crypto');
const moralisRoutes = require('./routes/moralis');
const figmaRoutes = require('./routes/figma');
const unsplashRoutes = require('./routes/unsplash');
const chatRoutes = require('./routes/chat');

app.use('/api/auth', (req, res, next) => {
  const authRouter = authRoutes(() => db);
  authRouter(req, res, next);
});

app.use('/api/nft', (req, res, next) => {
  const nftRouter = nftRoutes(() => db, io);
  nftRouter(req, res, next);
});

app.use('/api/chat', (req, res, next) => {
  const chatRouter = chatRoutes(() => db, io);
  chatRouter(req, res, next);
});

app.use('/api/crypto', cryptoRoutes);
app.use('/api/moralis', moralisRoutes);
app.use('/api/figma', figmaRoutes);
app.use('/api/unsplash', unsplashRoutes);

let cryptoPrices = [];

async function fetchCryptoPrices() {
  try {
    const response = await axios.get('https://api.coinranking.com/v2/coins', {
      headers: {
        'x-access-token': process.env.COINRANKING_API_KEY
      },
      params: {
        limit: 100,
        timePeriod: '24h',
        orderBy: 'marketCap',
        orderDirection: 'desc'
      }
    });
    
    if (response.data && response.data.data && response.data.data.coins) {
      cryptoPrices = response.data.data.coins.map((crypto) => ({
        id: crypto.uuid,
        name: crypto.name,
        symbol: crypto.symbol,
        price: parseFloat(crypto.price),
        change_24h: parseFloat(crypto.change) || 0,
        market_cap: parseFloat(crypto.marketCap),
        volume_24h: parseFloat(crypto['24hVolume']),
        rank: crypto.rank,
        image: crypto.iconUrl,
        sparkline: crypto.sparkline || []
      }));
      
      io.emit('cryptoPrices', cryptoPrices);
      console.log(`✅ Fetched ${cryptoPrices.length} cryptocurrencies from Coinranking`);
      console.log(`📤 Emitted crypto prices to all connected clients`);
    }
  } catch (error) {
    console.error('❌ Error fetching crypto prices from Coinranking:', error.response?.data || error.message);
    
    try {
      const geckoResponse = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        headers: {
          'x-cg-demo-api-key': process.env.COINGECKO_API_KEY
        },
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: true,
          price_change_percentage: '24h'
        }
      });
      
      if (geckoResponse.data && Array.isArray(geckoResponse.data)) {
        cryptoPrices = geckoResponse.data.map((crypto, index) => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol.toUpperCase(),
          price: crypto.current_price,
          change_24h: crypto.price_change_percentage_24h || 0,
          market_cap: crypto.market_cap,
          volume_24h: crypto.total_volume,
          rank: index + 1,
          image: crypto.image,
          sparkline: crypto.sparkline_in_7d?.price?.slice(-24) || []
        }));
        
        io.emit('cryptoPrices', cryptoPrices);
        console.log(`✅ Fetched ${cryptoPrices.length} cryptocurrencies from CoinGecko (fallback)`);
        console.log(`📤 Emitted crypto prices to all connected clients`);
      }
    } catch (geckoError) {
      console.error('❌ CoinGecko fallback also failed:', geckoError.message);
    }
  }
}

io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);
  
  // Send current crypto prices immediately
  if (cryptoPrices && cryptoPrices.length > 0) {
    console.log(`📤 Sending ${cryptoPrices.length} crypto prices to client ${socket.id}`);
    socket.emit('cryptoPrices', cryptoPrices);
  }
  
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// Fetch crypto prices immediately on startup
fetchCryptoPrices();

// Then fetch every 30 seconds
setInterval(fetchCryptoPrices, 30000);

const PORT = process.env.PORT || 5000;

initDatabase().then(() => {
  server.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ Frontend: http://localhost:5173`);
    console.log(`✅ Backend: http://localhost:${PORT}`);
  });
});
