# GitHub ga Push qilish va Deploy qilish

## 1-Qadam: GitHub Repository yarating

1. GitHub.com ga kiring
2. "New repository" tugmasini bosing
3. Repository nomi: `multimarket-2026`
4. Description: `Crypto Exchange & NFT Marketplace with real-time features`
5. Public yoki Private tanlang
6. **README, .gitignore, license qo'shmang** (bizda allaqachon bor)
7. "Create repository" tugmasini bosing

## 2-Qadam: Local Git ni sozlang

Terminal da quyidagi buyruqlarni bajaring:

```bash
# Git repository yarating (agar yo'q bo'lsa)
git init

# Barcha fayllarni staging ga qo'shing
git add .

# Commit qiling
git commit -m "Initial commit: MultiMarket 2026 - Full project"

# Main branch yarating
git branch -M main

# GitHub remote ni qo'shing (YOUR-USERNAME ni o'zgartiring!)
git remote add origin https://github.com/YOUR-USERNAME/multimarket-2026.git

# Push qiling
git push -u origin main
```

## 3-Qadam: Railway ga Deploy qiling (Backend)

### A. Railway.app da account yarating

1. https://railway.app ga boring
2. "Start a New Project" tugmasini bosing
3. "Deploy from GitHub repo" ni tanlang
4. `multimarket-2026` repository ni tanlang

### B. Environment Variables qo'shing

Railway dashboard da "Variables" bo'limiga boring va quyidagilarni qo'shing:

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

### C. Deploy tugmasini bosing

Railway avtomatik deploy qiladi. Deploy tugagach, URL ni ko'ring (masalan: `https://multimarket-production.up.railway.app`)

## 4-Qadam: Frontend URL larni yangilang

Railway URL ni olgandan keyin, local da quyidagi buyruqni bajaring:

```bash
# Railway URL ni kiriting (https:// bilan)
node update-api-urls.js https://multimarket-production.up.railway.app
```

Bu barcha frontend komponentlardagi API URL larni avtomatik yangilaydi.

## 5-Qadam: O'zgarishlarni GitHub ga push qiling

```bash
# Yangilangan fayllarni qo'shing
git add .

# Commit qiling
git commit -m "Update API URLs for production"

# Push qiling
git push origin main
```

## 6-Qadam: Vercel ga Deploy qiling (Frontend)

### A. Vercel.com da account yarating

1. https://vercel.com ga boring
2. GitHub bilan login qiling

### B. New Project yarating

1. "Add New..." → "Project" tugmasini bosing
2. `multimarket-2026` repository ni import qiling
3. Quyidagi sozlamalarni kiriting:

```
Framework Preset: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### C. Environment Variables qo'shing

Vercel da "Environment Variables" bo'limiga boring:

```
VITE_API_URL=https://multimarket-production.up.railway.app
```

### D. Deploy tugmasini bosing

Vercel avtomatik deploy qiladi va sizga URL beradi (masalan: `https://multimarket-2026.vercel.app`)

## 7-Qadam: CORS ni sozlang

Railway backend da CORS ni yangilash kerak. `server/index.js` faylini yangilang:

```javascript
const io = socketIo(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://multimarket-2026.vercel.app", // Sizning Vercel URL ingiz
      "https://your-custom-domain.com" // Agar custom domain bo'lsa
    ],
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://multimarket-2026.vercel.app", // Sizning Vercel URL ingiz
    "https://your-custom-domain.com" // Agar custom domain bo'lsa
  ]
}));
```

Keyin GitHub ga push qiling:

```bash
git add server/index.js
git commit -m "Update CORS for production"
git push origin main
```

Railway avtomatik qayta deploy qiladi.

## ✅ Tekshirish

1. **Frontend:** https://multimarket-2026.vercel.app ga boring
2. **Backend:** https://multimarket-production.up.railway.app/api/nft/all ga boring
3. **Test qiling:**
   - Authentication (Register/Login)
   - Crypto prices ko'rinishi
   - NFT marketplace
   - Chat functionality
   - File uploads

## 🎉 Tayyor!

Sizning loyihangiz endi production da ishlayapti!

**Frontend URL:** https://multimarket-2026.vercel.app  
**Backend URL:** https://multimarket-production.up.railway.app  
**GitHub Repo:** https://github.com/YOUR-USERNAME/multimarket-2026

## 🔄 Keyingi yangilanishlar uchun

Har safar kod o'zgartirsangiz:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Railway va Vercel avtomatik qayta deploy qiladi!

## 🆘 Muammolar bo'lsa

1. Railway logs ni tekshiring
2. Vercel logs ni tekshiring
3. Browser console ni tekshiring (F12)
4. Environment variables to'g'ri kiritilganini tekshiring

---

**Omad! 🚀**
