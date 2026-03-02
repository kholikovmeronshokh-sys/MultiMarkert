# Vercel ga Deploy qilish bo'yicha qo'llanma

## ⚠️ MUHIM OGOHLANTIRISH

Sizning hozirgi loyihangiz Vercel serverless bilan **TO'LIQ MOS EMAS** chunki:

1. **SQLite** - Vercel serverless da file-based database ishlamaydi
2. **File Uploads** - Local filesystem Vercel da persistent emas
3. **Socket.io** - WebSocket connections Vercel serverless functions da ishlamaydi

## ✅ TAVSIYA QILINGAN YO'L: Railway + Vercel

### 1-Qadam: Backend ni Railway ga deploy qiling

```bash
# 1. Railway.app da account yarating
# 2. "New Project" → "Deploy from GitHub repo"
# 3. Repository ni tanlang
# 4. Environment Variables qo'shing:
```

Railway dashboard da quyidagi environment variables ni qo'shing:

```
PORT=5000
NODE_ENV=production
JWT_SECRET=multimarket_secret_key_2026_change_in_production_xz123456789
COINRANKING_API_KEY=coinranking8d8942af05389e992a24c33c62da5431de9eb0b3915529e9
COINGECKO_API_KEY=CG-7Nox7eje37jxCKSuw7zXEDow
NFTSCAN_API_KEY=2BfCnjTKB1txlmiXF3RF5Eya
MORALIS_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjI4YWRiYmJjLTJlNjEtNDA0Ny1hZDY2LTkyMTQ0NjFmYzdhMyIsIm9yZ0lkIjoiNTAzNDYwIiwidXNlcklkIjoiNTE4MDMyIiwidHlwZUlkIjoiNDEyODA2OTMtNDAzMy00ZmEyLTlkNDUtOGFjZmIyOTNhNTdhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3NzI0Mjg1MDQsImV4cCI6NDkyODE4ODUwNH0.mM6nrdvDixficTQ9T2TrHINksVt27Mi8suaRUyJSLSM
FIGMA_CLIENT_ID=ts6A30eT3rhckSi2domNhW
FIGMA_CLIENT_SECRET=509TAB7XGAJZ8sgxBVHzqNZXDtN4h8
UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_KEY_HERE
ADMIN_EMAIL=kholikovmeronshokh@gmail.com
```

Railway avtomatik deploy qiladi va sizga URL beradi (masalan: `https://multimarket-production.up.railway.app`)

### 2-Qadam: Frontend URL larni yangilang

Railway URL ni olgandan keyin:

```bash
node update-api-urls.js https://your-railway-url.railway.app
```

### 3-Qadam: Frontend ni Vercel ga deploy qiling

```bash
# Vercel CLI ni o'rnating
npm install -g vercel

# Client papkasiga o'ting
cd client

# Build qiling
npm run build

# Vercel ga deploy qiling
vercel

# Production ga deploy qiling
vercel --prod
```

## 🚀 TEZKOR YO'L: Render.com (Hammasi bir joyda)

Agar Railway + Vercel murakkab bo'lsa, Render.com dan foydalaning:

### 1. Render.com da account yarating

### 2. New Web Service yarating

### 3. GitHub repo ni ulang

### 4. Quyidagi sozlamalarni kiriting:

```
Name: multimarket-2026
Environment: Node
Build Command: npm install && cd client && npm install && npm run build
Start Command: npm start
```

### 5. Environment Variables qo'shing

Yuqoridagi barcha environment variables ni qo'shing.

### 6. Deploy tugmasini bosing

Render avtomatik deploy qiladi va sizga URL beradi.

## 📝 GitHub ga Push qilish

```bash
# Git repository yarating (agar yo'q bo'lsa)
git init

# Barcha fayllarni qo'shing
git add .

# Commit qiling
git commit -m "MultiMarket 2026 - Full project with env"

# GitHub da yangi repository yarating
# Keyin remote qo'shing
git remote add origin https://github.com/your-username/multimarket-2026.git

# Push qiling
git branch -M main
git push -u origin main
```

## ⚡ MUHIM ESLATMALAR

1. **.env fayli** endi .gitignore da yo'q, shuning uchun u GitHub ga push qilinadi
2. **Production da** JWT_SECRET ni o'zgartiring
3. **Railway/Render** avtomatik .env faylni o'qiydi
4. **CORS** sozlamalarini production URL ga moslashtiring

## 🔧 Production uchun CORS sozlash

`server/index.js` da CORS ni yangilang:

```javascript
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://your-vercel-app.vercel.app",
      "https://your-custom-domain.com"
    ],
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-vercel-app.vercel.app",
    "https://your-custom-domain.com"
  ]
}));
```

## ✅ Deploy qilingandan keyin tekshiring

1. Frontend ochilishi
2. Authentication ishlashi
3. Crypto prices ko'rinishi
4. NFT marketplace ishlashi
5. Chat ishlashi
6. File upload ishlashi

## 🎉 Tayyor!

Endi sizning loyihangiz production da ishlayapti!

**Frontend:** https://your-app.vercel.app  
**Backend:** https://your-app.railway.app  
**Database:** SQLite (Railway da)  
**Uploads:** Local filesystem (Railway da)  
**WebSocket:** Socket.io (Railway da)

---

**Savol bo'lsa, START.md va DEPLOY.md fayllarini o'qing!**
