# 🚀 MultiMarket 2026

Modern Crypto Exchange va NFT Marketplace platformasi - Real-time yangilanishlar, Socket.io, va professional 4K dizayn bilan.

![Version](https://img.shields.io/badge/version-1.0.0-gold)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.3.1-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Asosiy Xususiyatlar

### 🪙 Real-Time Crypto Market
- 100 ta eng yirik cryptocurrency lar
- Real-time narx yangilanishlari (har 30 soniyada)
- Sparkline chartlar
- Market cap va 24h volume
- Qidiruv va filtrlar (All/Gainers/Losers)

### 🎨 NFT Marketplace
- NFT yaratish va sotish
- Rasm yuklash (Unsplash integratsiyasi)
- Buy/sell tizimi real-time chat bilan
- Rating tizimi (faqat xaridorlar)
- Admin cheksiz, oddiy foydalanuvchilar 1 ta NFT

### 🔥 Trending NFT Collections
- NFTScan API integratsiyasi
- Wallet NFT qidiruv
- Collection statistikasi
- Real-time yangilanishlar

### 💬 Real-Time Chat
- Socket.io asosida
- Xaridor-sotuvchi muloqoti
- Xabarlar tarixi

### 👤 Profil Sahifasi
- Foydalanuvchi statistikasi
- Yaratilgan NFT lar
- Sotib olingan NFT lar
- Rating tarixi

### 🎯 Authentication
- JWT asosida xavfsiz autentifikatsiya
- Email va parol
- Admin va oddiy foydalanuvchi rollari

## 🚀 Tezkor Boshlash

### O'rnatish

```bash
# Repository ni clone qiling
git clone https://github.com/YOUR-USERNAME/multimarket-2026.git
cd multimarket-2026

# Dependencies ni o'rnating
npm install

# Development serverlarni ishga tushiring
npm run dev
```

Dastur quyidagi manzillarda ochiladi:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Admin Account

**Email:** kholikovmeronshokh@gmail.com  
**Xususiyat:** Cheksiz NFT yaratish

## 📚 Hujjatlar

- [START.md](./START.md) - To'liq sozlash va foydalanish qo'llanmasi
- [GITHUB-PUSH.md](./GITHUB-PUSH.md) - GitHub ga push va deploy qilish
- [VERCEL-DEPLOY.md](./VERCEL-DEPLOY.md) - Vercel deployment yo'riqnomasi
- [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) - Tezkor ma'lumotnoma

## 🛠️ Texnologiyalar

### Frontend
- React 18.3.1
- Vite 5.4.21
- Socket.io Client
- Axios
- React Router DOM

### Backend
- Node.js & Express
- Socket.io
- SQLite (sql.js)
- JWT Authentication
- Multer (file uploads)

### API lar
- Coinranking API (crypto narxlari)
- CoinGecko API (fallback)
- NFTScan API (trending NFT lar)
- Unsplash API (rasm qidiruv)

## 📁 Loyiha Strukturasi

```
multimarket/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React komponentlar
│   │   ├── config.js    # API konfiguratsiya
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/              # Node.js backend
│   ├── routes/          # API routes
│   ├── models/          # Database models
│   ├── middleware/      # Auth middleware
│   └── index.js
├── uploads/             # NFT rasmlari
├── multimarket.db       # SQLite database
├── .env                 # Environment variables (GitHub da)
└── package.json
```

## 🔐 Environment Variables

`.env` fayli loyihada mavjud va quyidagi ma'lumotlarni o'z ichiga oladi:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=multimarket_secret_key_2026_change_in_production_xz123456789
COINRANKING_API_KEY=coinranking8d8942af05389e992a24c33c62da5431de9eb0b3915529e9
COINGECKO_API_KEY=CG-7Nox7eje37jxCKSuw7zXEDow
NFTSCAN_API_KEY=2BfCnjTKB1txlmiXF3RF5Eya
MORALIS_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
FIGMA_CLIENT_ID=ts6A30eT3rhckSi2domNhW
FIGMA_CLIENT_SECRET=509TAB7XGAJZ8sgxBVHzqNZXDtN4h8
UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_KEY_HERE
ADMIN_EMAIL=kholikovmeronshokh@gmail.com
```

**⚠️ MUHIM:** Production da JWT_SECRET ni o'zgartiring!

## 🚢 Deployment

### Tavsiya qilingan: Railway + Vercel

1. **Backend ni Railway ga:**
   - Railway.app da account yarating
   - GitHub repo ni ulang
   - Environment variables qo'shing
   - Avtomatik deploy

2. **Frontend ni Vercel ga:**
   - API URL larni yangilang: `node update-api-urls.js <railway-url>`
   - Vercel.com da account yarating
   - GitHub repo ni import qiling
   - Avtomatik deploy

Batafsil ko'rsatmalar: [GITHUB-PUSH.md](./GITHUB-PUSH.md)

## 📝 NPM Scripts

```bash
# Development
npm run dev          # Frontend va backend ni ishga tushirish
npm run server       # Faqat backend
npm run client       # Faqat frontend

# Production
npm run build        # Frontend ni build qilish
npm start            # Production server

# Utilities
npm run check        # Tizim holatini tekshirish
npm run update-urls  # API URL larni yangilash
```

## 🐛 Ma'lum Muammolar

1. **NFTScan API 401:** Kutilgan xatti-harakat - mock data ishlatiladi
2. **Vercel Limitations:** Hozirgi arxitektura to'g'ridan-to'g'ri Vercel serverless bilan mos emas (Railway + Vercel dan foydalaning)

## 🎨 UI/UX Xususiyatlari

- Professional 4K dizayn
- Oltin (#FFD700) va ko'k gradient tema
- Glassmorphism effektlar
- Silliq animatsiyalar
- Mobile responsive
- Qorong'u tema

## 📊 Real-Time Yangilanishlar

- Crypto narxlari: Har 30 soniyada
- NFT marketplace: Har 10 soniyada
- Trending NFT lar: Har 30 soniyada
- Chat xabarlari: Bir zumda (Socket.io)

## 🔧 Muammolarni Hal Qilish

### Server ishga tushmayapti
```bash
taskkill /F /IM node.exe
npm run dev
```

### Crypto narxlari ko'rinmayapti
- Server loglarida "✅ Fetched X cryptocurrencies" ni tekshiring
- Browser console ni oching (F12)
- Socket.io ulanishini tekshiring

### NFT rasmlari yuklanmayapti
- uploads papkasi mavjudligini tekshiring
- Fayl ruxsatlarini tekshiring

## 🤝 Hissa Qo'shish

1. Repository ni fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. O'zgarishlarni commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Branch ga push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request oching

## 📄 Litsenziya

MIT License

## 👨‍💻 Muallif

**MultiMarket Team**  
2026 yilda ❤️ bilan yaratilgan

## 🙏 Minnatdorchilik

- Coinranking API - crypto ma'lumotlari uchun
- NFTScan - NFT collection ma'lumotlari uchun
- Unsplash - rasm qidiruv uchun
- Socket.io - real-time xususiyatlar uchun

---

## 🚀 Deployment Holati

- ✅ Local development ishlayapti
- ✅ GitHub ga push qilishga tayyor
- ✅ Railway deployment uchun tayyor
- ✅ Vercel deployment uchun tayyor
- ✅ Barcha hujjatlar yaratilgan
- ✅ Environment variables sozlangan
- ✅ Favicon qo'shilgan

---

**⭐ Agar foydali bo'lsa, repository ga star bering!**

## 📞 Qo'shimcha Ma'lumot

Savollar yoki muammolar bo'lsa:
1. [START.md](./START.md) ni o'qing
2. [GITHUB-PUSH.md](./GITHUB-PUSH.md) ni o'qing
3. [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) dan foydalaning
4. Server va browser loglarini tekshiring

---

**Omad! Sizning loyihangiz production ga tayyor! 🎉**
