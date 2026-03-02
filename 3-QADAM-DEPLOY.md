# 🚀 3 Qadam da Deploy qiling!

## Qadam 1: GitHub ga Push qiling (5 daqiqa)

Terminal da quyidagi buyruqlarni bajaring:

```bash
# Git repository yarating
git init

# Barcha fayllarni qo'shing
git add .

# Commit qiling
git commit -m "MultiMarket 2026 - Production ready"

# GitHub da yangi repository yarating: multimarket-2026
# Keyin quyidagi buyruqni bajaring (YOUR-USERNAME ni o'zgartiring!)
git remote add origin https://github.com/YOUR-USERNAME/multimarket-2026.git

# Push qiling
git branch -M main
git push -u origin main
```

✅ **Tayyor!** Kodingiz GitHub da!

---

## Qadam 2: Railway ga Backend Deploy qiling (10 daqiqa)

### 2.1. Railway.app ga boring va account yarating

### 2.2. "New Project" tugmasini bosing

### 2.3. "Deploy from GitHub repo" ni tanlang

### 2.4. `multimarket-2026` repository ni tanlang

### 2.5. "Variables" bo'limiga boring va quyidagilarni qo'shing:

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

### 2.6. Deploy tugmasini bosing va kutib turing

### 2.7. Railway URL ni ko'ring va nusxa oling

Masalan: `https://multimarket-production.up.railway.app`

✅ **Tayyor!** Backend ishlayapti!

---

## Qadam 3: Vercel ga Frontend Deploy qiling (10 daqiqa)

### 3.1. Frontend URL larni yangilang

Local terminal da (Railway URL ni kiriting):

```bash
node update-api-urls.js https://multimarket-production.up.railway.app

git add .
git commit -m "Update API URLs for production"
git push origin main
```

### 3.2. Vercel.com ga boring va account yarating

GitHub bilan login qiling.

### 3.3. "New Project" tugmasini bosing

### 3.4. `multimarket-2026` repository ni import qiling

### 3.5. Sozlamalarni kiriting:

```
Framework Preset: Vite
Root Directory: client
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### 3.6. Environment Variables qo'shing:

```
VITE_API_URL=https://multimarket-production.up.railway.app
```

(Railway URL ingizni kiriting)

### 3.7. "Deploy" tugmasini bosing va kutib turing

### 3.8. Vercel URL ni oling

Masalan: `https://multimarket-2026.vercel.app`

✅ **TAYYOR!** Sizning loyihangiz production da ishlayapti! 🎉

---

## 🎊 Tabriklaymiz!

Sizning loyihangiz endi jonli!

**Frontend:** https://multimarket-2026.vercel.app  
**Backend:** https://multimarket-production.up.railway.app  
**GitHub:** https://github.com/YOUR-USERNAME/multimarket-2026

---

## 🧪 Test qiling

1. Frontend URL ga boring
2. Register qiling
3. Crypto narxlarini ko'ring
4. NFT yarating
5. Chat ni sinab ko'ring

---

## 🔧 Agar biror narsa ishlamasa

### Backend ishlamayapti?
- Railway logs ni tekshiring
- Environment variables to'g'ri kiritilganini tekshiring

### Frontend ishlamayapti?
- Vercel logs ni tekshiring
- API URL to'g'ri kiritilganini tekshiring

### CORS xatosi?
Railway dashboard da `server/index.js` ni yangilang:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'https://multimarket-2026.vercel.app', // Sizning Vercel URL ingiz
];
```

Keyin GitHub ga push qiling - Railway avtomatik yangilanadi.

---

## 📞 Qo'shimcha Yordam

Batafsil qo'llanmalar:
- [GITHUB-PUSH.md](./GITHUB-PUSH.md) - To'liq deployment qo'llanmasi
- [START.md](./START.md) - Local development
- [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) - Tezkor yordam

---

**Omad! Sizning loyihangiz production da! 🚀**
