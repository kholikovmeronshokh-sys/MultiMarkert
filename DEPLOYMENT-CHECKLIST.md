# 🚀 Deployment Checklist

## ✅ Tayyor bo'lgan narsalar

- [x] Barcha kod yozilgan va ishlayapti
- [x] Environment variables sozlangan (.env fayli)
- [x] Favicon qo'shilgan (SVG format)
- [x] CORS production uchun sozlangan
- [x] API URL lar dinamik (local/production)
- [x] Barcha hujjatlar yaratilgan
- [x] .gitignore to'g'ri sozlangan (.env commit qilinadi)
- [x] Real-time features ishlayapti
- [x] Database (SQLite) tayyor
- [x] File uploads ishlayapti

## 📋 Deploy qilish qadamlari

### 1. GitHub ga Push qilish

```bash
# Git init (agar yo'q bo'lsa)
git init

# Barcha fayllarni qo'shing
git add .

# Commit qiling
git commit -m "MultiMarket 2026 - Production ready"

# GitHub da repository yarating
# Keyin remote qo'shing (YOUR-USERNAME ni o'zgartiring!)
git remote add origin https://github.com/YOUR-USERNAME/multimarket-2026.git

# Push qiling
git branch -M main
git push -u origin main
```

**Status:** ⏳ Kutilmoqda

---

### 2. Railway ga Backend Deploy qilish

1. ✅ Railway.app ga boring
2. ✅ "New Project" → "Deploy from GitHub repo"
3. ✅ `multimarket-2026` ni tanlang
4. ✅ Environment Variables qo'shing:
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
5. ✅ Deploy tugmasini bosing
6. ✅ Railway URL ni oling (masalan: `https://multimarket-production.up.railway.app`)

**Railway URL:** ___________________ (bu yerga yozing)

**Status:** ⏳ Kutilmoqda

---

### 3. Frontend URL larni Yangilash

Railway URL ni olgandan keyin:

```bash
# Railway URL ni kiriting
node update-api-urls.js https://YOUR-RAILWAY-URL.railway.app

# O'zgarishlarni commit qiling
git add .
git commit -m "Update API URLs for production"
git push origin main
```

**Status:** ⏳ Kutilmoqda

---

### 4. Vercel ga Frontend Deploy qilish

1. ✅ Vercel.com ga boring
2. ✅ GitHub bilan login qiling
3. ✅ "New Project" → `multimarket-2026` ni import qiling
4. ✅ Sozlamalar:
   ```
   Framework: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   ```
5. ✅ Environment Variables:
   ```
   VITE_API_URL=https://YOUR-RAILWAY-URL.railway.app
   ```
6. ✅ Deploy tugmasini bosing
7. ✅ Vercel URL ni oling (masalan: `https://multimarket-2026.vercel.app`)

**Vercel URL:** ___________________ (bu yerga yozing)

**Status:** ⏳ Kutilmoqda

---

### 5. CORS ni Yangilash

`server/index.js` da CORS ni yangilang:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://multimarket-2026.vercel.app', // Sizning Vercel URL ingiz
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
].filter(Boolean);
```

Keyin push qiling:

```bash
git add server/index.js
git commit -m "Update CORS for production"
git push origin main
```

Railway avtomatik qayta deploy qiladi.

**Status:** ⏳ Kutilmoqda

---

## 🧪 Testing Checklist

Deploy qilingandan keyin quyidagilarni tekshiring:

### Frontend (Vercel)
- [ ] Sahifa ochiladi
- [ ] Favicon ko'rinadi
- [ ] Dizayn to'g'ri ko'rinadi
- [ ] Mobile responsive ishlayapti

### Authentication
- [ ] Register ishlayapti
- [ ] Login ishlayapti
- [ ] JWT token saqlanadi
- [ ] Logout ishlayapti

### Crypto Market
- [ ] 100 ta crypto ko'rinadi
- [ ] Narxlar real-time yangilanadi
- [ ] Sparkline chartlar ko'rinadi
- [ ] Qidiruv ishlayapti
- [ ] Filtrlar ishlayapti

### NFT Marketplace
- [ ] NFT lar ko'rinadi
- [ ] NFT yaratish ishlayapti
- [ ] Rasm yuklash ishlayapti
- [ ] Unsplash qidiruv ishlayapti
- [ ] Buy tugmasi ishlayapti
- [ ] Chat ochiladi

### Chat
- [ ] Xabarlar yuboriladi
- [ ] Real-time ishlayapti
- [ ] Xabarlar tarixi ko'rinadi
- [ ] Gift tugmasi ishlayapti

### Trending NFTs
- [ ] Collections ko'rinadi
- [ ] Wallet qidiruv ishlayapti
- [ ] Statistika ko'rinadi

### Profile
- [ ] Profil sahifasi ochiladi
- [ ] Yaratilgan NFT lar ko'rinadi
- [ ] Sotib olingan NFT lar ko'rinadi
- [ ] Statistika to'g'ri

### Admin Features
- [ ] Admin email bilan login
- [ ] Cheksiz NFT yaratish

---

## 🎉 Deployment Tugadi!

Barcha checklistlar bajarilgandan keyin:

**Frontend URL:** https://multimarket-2026.vercel.app  
**Backend URL:** https://multimarket-production.up.railway.app  
**GitHub Repo:** https://github.com/YOUR-USERNAME/multimarket-2026

---

## 📝 Keyingi Qadamlar

1. **Custom Domain:** Vercel da custom domain qo'shing
2. **SSL Certificate:** Avtomatik (Vercel va Railway)
3. **Monitoring:** Railway va Vercel logs ni kuzating
4. **Analytics:** Google Analytics qo'shing
5. **SEO:** Meta tags va sitemap qo'shing

---

## 🆘 Muammolar

Agar biror narsa ishlamasa:

1. **Railway Logs:** Railway dashboard → Logs
2. **Vercel Logs:** Vercel dashboard → Deployments → Logs
3. **Browser Console:** F12 → Console
4. **Network Tab:** F12 → Network
5. **Environment Variables:** To'g'ri kiritilganini tekshiring

---

## 📞 Yordam

Qo'shimcha yordam kerak bo'lsa:
- [GITHUB-PUSH.md](./GITHUB-PUSH.md) - Batafsil qo'llanma
- [START.md](./START.md) - Local development
- [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) - Tezkor ma'lumotnoma

---

**Omad! Sizning loyihangiz production ga tayyor! 🚀**
