# MultiMarket 2026 - Deployment Guide

## Current Architecture Issues for Vercel

Your current application uses:
1. **SQLite database** - File-based, doesn't work on serverless
2. **File uploads** - Local filesystem, not persistent on Vercel
3. **Socket.io** - WebSocket connections, not supported on Vercel serverless functions

## Option 1: Deploy Backend to Railway + Frontend to Vercel (RECOMMENDED)

### Step 1: Deploy Backend to Railway

1. Create account at https://railway.app
2. Create new project → Deploy from GitHub
3. Add environment variables in Railway dashboard:
   ```
   PORT=5000
   JWT_SECRET=multimarket_secret_key_2026_change_in_production
   COINRANKING_API_KEY=coinranking8d8942af05389e992a24c33c62da5431de9eb0b3915529e9
   COINGECKO_API_KEY=CG-7Nox7eje37jxCKSuw7zXEDow
   NFTSCAN_API_KEY=2BfCnjTKB1txlmiXF3RF5Eya
   MORALIS_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   FIGMA_CLIENT_ID=ts6A30eT3rhckSi2domNhW
   FIGMA_CLIENT_SECRET=509TAB7XGAJZ8sgxBVHzqNZXDtN4h8
   UNSPLASH_ACCESS_KEY=YOUR_UNSPLASH_KEY_HERE
   ADMIN_EMAIL=kholikovmeronshokh@gmail.com
   ```
4. Railway will automatically detect Node.js and deploy
5. Get your Railway URL (e.g., `https://your-app.railway.app`)

### Step 2: Update Frontend for Production

Update all API URLs in client components from `http://localhost:5000` to your Railway URL:

**Files to update:**
- `client/src/components/Auth.jsx`
- `client/src/components/CryptoMarket.jsx`
- `client/src/components/NFTMarket.jsx`
- `client/src/components/TrendingNFTs.jsx`
- `client/src/components/CreateNFT.jsx`
- `client/src/components/Profile.jsx`
- `client/src/components/ChatModal.jsx`

Replace: `http://localhost:5000` → `https://your-app.railway.app`

### Step 3: Deploy Frontend to Vercel

1. Create `vercel.json` in root:
```json
{
  "buildCommand": "cd client && npm install && npm run build",
  "outputDirectory": "client/dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

2. Deploy to Vercel:
```bash
npm install -g vercel
cd client
vercel
```

3. Follow prompts and deploy

---

## Option 2: Full Serverless on Vercel (Requires Major Changes)

### Required Changes:

#### 1. Replace SQLite with Cloud Database

**Option A: Supabase (PostgreSQL)**
```bash
npm install @supabase/supabase-js
```

**Option B: PlanetScale (MySQL)**
```bash
npm install @planetscale/database
```

**Option C: MongoDB Atlas**
```bash
npm install mongodb
```

#### 2. Replace File Uploads with Cloud Storage

**Option A: Cloudinary**
```bash
npm install cloudinary multer-storage-cloudinary
```

**Option B: Vercel Blob**
```bash
npm install @vercel/blob
```

#### 3. Replace Socket.io with Cloud Service

**Option A: Pusher**
```bash
npm install pusher pusher-js
```

**Option B: Ably**
```bash
npm install ably
```

---

## Option 3: Deploy Everything to Render.com

Render supports WebSockets and persistent storage:

1. Create account at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Configure:
   - Build Command: `npm install && cd client && npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variables
5. Render will deploy both frontend and backend together

---

## Quick Fix for Current Setup

If you want to test locally first:

1. Make sure only one server instance is running
2. Start backend: `npm run dev` (from root)
3. Start frontend: `cd client && npm run dev`
4. Access at `http://localhost:5173`

---

## Recommended Deployment Strategy

**For fastest deployment with minimal changes:**
1. Deploy backend to Railway (keeps SQLite, file uploads, Socket.io working)
2. Deploy frontend to Vercel
3. Update API URLs in frontend to point to Railway

**Total time: ~30 minutes**

---

## After Deployment Checklist

- [ ] Test authentication (login/register)
- [ ] Test crypto prices real-time updates
- [ ] Test NFT creation and upload
- [ ] Test NFT marketplace and buying
- [ ] Test chat functionality
- [ ] Test trending NFT collections
- [ ] Test profile page
- [ ] Verify admin account has unlimited NFT creation
- [ ] Test on mobile devices

---

## Support

If you encounter issues:
1. Check Railway/Vercel logs
2. Verify all environment variables are set
3. Check CORS settings in backend
4. Ensure API URLs are updated in frontend
