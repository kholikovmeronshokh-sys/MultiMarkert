# 🚂 Railway ga Deploy qilish

## ✅ Tayyor bo'lgan narsalar

- ✅ GitHub repository: https://github.com/kholikovmeronshokh-sys/MultiMarkert
- ✅ Railway konfiguratsiya fayllari qo'shildi
- ✅ Package.json tuzatildi

---

## 📋 Railway Setup Qadamlari

### 1. Railway.app ga boring

https://railway.app ga boring va GitHub bilan login qiling.

### 2. New Project yarating

1. "New Project" tugmasini bosing
2. "Deploy from GitHub repo" ni tanlang
3. **MultiMarkert** repository ni tanlang

### 3. Environment Variables qo'shing

Railway dashboard da "Variables" bo'limiga boring va quyidagilarni **AYNAN** qo'shing:

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

**MUHIM:** Har bir variable ni alohida qo'shing:
- Variable name: `PORT`
- Variable value: `5000`
- "Add" tugmasini bosing
- Keyingi variable uchun takrorlang

### 4. Deploy Settings

Railway avtomatik aniqlaydi, lekin agar so'rasa:

- **Build Command:** `npm install`
- **Start Command:** `node server/index.js`
- **Root Directory:** `/` (default)

### 5. Deploy qiling

"Deploy" tugmasini bosing va kutib turing (3-5 daqiqa).

### 6. Railway URL ni oling

Deploy tugagandan keyin:
1. "Settings" bo'limiga boring
2. "Domains" ni toping
3. Railway URL ni ko'ring (masalan: `multimarkert-production.up.railway.app`)
4. URL ni nusxa oling

---

## 🔍 Deploy Statusini Tekshirish

Railway dashboard da:
- **Deployments** - Deploy tarixi
- **Logs** - Real-time loglar
- **Metrics** - CPU, Memory, Network

Deploy muvaffaqiyatli bo'lsa, logs da ko'rasiz:
```
✅ Server running on port 5000
✅ Frontend: http://localhost:5173
✅ Backend: http://localhost:5000
SQLite database initialized
✅ Fetched 100 cryptocurrencies from Coinranking
```

---

## ⚠️ Agar Deploy Muvaffaqiyatsiz Bo'lsa

### Logs ni tekshiring:
Railway dashboard → Deployments → Latest deployment → View logs

### Keng tarqalgan muammolar:

1. **npm ci error:**
   - ✅ Hal qilindi - package.json tuzatildi

2. **Port already in use:**
   - Railway avtomatik PORT ni beradi
   - Environment variable da PORT=5000 bo'lishi kerak

3. **Module not found:**
   - `npm install` to'g'ri ishlaganini tekshiring
   - package.json va package-lock.json sync bo'lishi kerak

4. **Database error:**
   - SQLite avtomatik yaratiladi
   - Xavotir olmang, birinchi run da yaratiladi

---

## ✅ Deploy Muvaffaqiyatli!

Railway URL ni olgandan keyin:

### Keyingi Qadam: Frontend URL larni yangilang

```bash
# Railway URL ni kiriting (https:// bilan)
node update-api-urls.js https://multimarkert-production.up.railway.app

# GitHub ga push qiling
git add .
git commit -m "Update API URLs for Railway production"
git push origin main
```

---

## 🌐 Keyin: Vercel ga Frontend Deploy qiling

1. Vercel.com ga boring
2. GitHub bilan login qiling
3. "New Project" → MultiMarkert ni import qiling
4. Sozlamalar:
   - Framework: **Vite**
   - Root Directory: **client**
   - Build Command: **npm run build**
   - Output Directory: **dist**
5. Environment Variables:
   ```
   VITE_API_URL=https://multimarkert-production.up.railway.app
   ```
6. Deploy tugmasini bosing

---

## 🎉 Tayyor!

**Backend (Railway):** https://multimarkert-production.up.railway.app  
**Frontend (Vercel):** https://multimarkert.vercel.app  
**GitHub:** https://github.com/kholikovmeronshokh-sys/MultiMarkert

---

## 📞 Yordam

Muammolar bo'lsa:
1. Railway logs ni tekshiring
2. Environment variables to'g'ri kiritilganini tekshiring
3. GitHub repository yangilangan bo'lishi kerak
4. [3-QADAM-DEPLOY.md](./3-QADAM-DEPLOY.md) ni o'qing

**Omad! 🚀**
