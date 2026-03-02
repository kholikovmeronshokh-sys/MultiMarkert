# 🚀 Vercel ga Frontend Deploy qilish

## ✅ Tayyor bo'lgan narsalar

- ✅ GitHub: https://github.com/kholikovmeronshokh-sys/MultiMarkert
- ✅ Railway Backend: https://multimarkert-production.up.railway.app
- ✅ API URLs yangilandi

---

## 📋 Vercel Deploy Qadamlari

### 1. Vercel.com ga boring

https://vercel.com ga boring va **GitHub bilan login qiling**.

### 2. New Project yarating

1. Dashboard da **"Add New..."** tugmasini bosing
2. **"Project"** ni tanlang
3. **"Import Git Repository"** ni tanlang

### 3. Repository ni import qiling

1. **MultiMarkert** repository ni toping
2. **"Import"** tugmasini bosing

### 4. Project Settings ni sozlang

**MUHIM:** Quyidagi sozlamalarni **AYNAN** kiriting:

#### Framework Preset:
```
Vite
```

#### Root Directory:
```
client
```

#### Build Command:
```
npm run build
```

#### Output Directory:
```
dist
```

#### Install Command:
```
npm install
```

### 5. Environment Variables qo'shing

**"Environment Variables"** bo'limida:

**Variable Name:**
```
VITE_API_URL
```

**Value:**
```
https://multimarkert-production.up.railway.app
```

**Environment:** All (Production, Preview, Development)

**"Add"** tugmasini bosing.

### 6. Deploy tugmasini bosing

**"Deploy"** tugmasini bosing va 2-3 daqiqa kutib turing.

---

## 🎉 Deploy Muvaffaqiyatli!

Deploy tugagandan keyin Vercel sizga URL beradi:

**Frontend URL:** `https://multimarkert.vercel.app` (yoki boshqa nom)

---

## 🧪 Test qiling

1. Vercel URL ga boring
2. **Register** qiling (yangi account)
3. **Login** qiling
4. **Crypto Market** ni ko'ring (100 ta crypto)
5. **NFT** yarating
6. **Chat** ni sinab ko'ring

---

## ⚠️ Agar biror narsa ishlamasa

### CORS Error?

Railway dashboard da `server/index.js` ni yangilash kerak.

Local da:

1. `server/index.js` ni oching
2. CORS sozlamalarini toping
3. Vercel URL ni qo'shing:

```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://multimarkert.vercel.app', // Sizning Vercel URL ingiz
  'https://multimarkert-production.up.railway.app',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
].filter(Boolean);
```

4. GitHub ga push qiling:
```bash
git add server/index.js
git commit -m "Add Vercel URL to CORS"
git push origin main
```

Railway avtomatik qayta deploy qiladi.

### API ishlamayapti?

1. Browser console ni oching (F12)
2. Network tab ni tekshiring
3. API requests ni ko'ring
4. Railway URL to'g'ri ekanligini tekshiring

### Crypto narxlari ko'rinmayapti?

1. Railway logs ni tekshiring
2. Socket.io connection ni tekshiring
3. Browser console da xatolarni ko'ring

---

## 🎊 TABRIKLAYMIZ!

Sizning loyihangiz endi jonli!

**Frontend:** https://multimarkert.vercel.app  
**Backend:** https://multimarkert-production.up.railway.app  
**GitHub:** https://github.com/kholikovmeronshokh-sys/MultiMarkert

---

## 📊 Final Checklist

- [x] GitHub ga push qilindi
- [x] Railway ga backend deploy qilindi
- [x] API URLs yangilandi
- [ ] Vercel ga frontend deploy qilindi ← **HOZIR QILING**
- [ ] CORS sozlandi (agar kerak bo'lsa)
- [ ] Test qilindi

---

## 🔗 Foydali Linklar

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Railway Dashboard:** https://railway.app/dashboard
- **GitHub Repo:** https://github.com/kholikovmeronshokh-sys/MultiMarkert

---

## 📞 Yordam

Muammolar bo'lsa:
1. Vercel logs ni tekshiring
2. Railway logs ni tekshiring
3. Browser console ni tekshiring (F12)
4. CORS sozlamalarini tekshiring

**Omad! Sizning loyihangiz deyarli tayyor! 🚀**
