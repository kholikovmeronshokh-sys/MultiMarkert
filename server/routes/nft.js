const express = require('express');
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/auth');

function rowToObject(columns, values) {
  const obj = {};
  columns.forEach((col, idx) => {
    obj[col] = values[idx];
  });
  return obj;
}

module.exports = (getDb, io) => {
  const router = express.Router();
  const auth = authMiddleware(getDb);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage });

  router.post('/create', auth, upload.single('image'), async (req, res) => {
    try {
      const { name, price, contactInfo } = req.body;
      const db = getDb();
      
      const countResult = db.exec('SELECT COUNT(*) as count FROM nfts WHERE ownerId = ?', [req.user.id]);
      const userNFTCount = countResult[0] ? countResult[0].values[0][0] : 0;
      
      if (req.user.isAdmin !== 1 && userNFTCount >= req.user.nftLimit) {
        return res.status(400).json({ message: 'NFT limit reached' });
      }
      
      db.run(
        'INSERT INTO nfts (name, image, price, contactInfo, ownerId) VALUES (?, ?, ?, ?, ?)',
        [name, req.file.path, price, contactInfo, req.user.id]
      );
      
      const nftResult = db.exec('SELECT * FROM nfts WHERE id = last_insert_rowid()');
      const nft = rowToObject(nftResult[0].columns, nftResult[0].values[0]);
      
      io.emit('nftCreated', nft);
      res.json(nft);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/all', async (req, res) => {
    try {
      const db = getDb();
      const result = db.exec(`
        SELECT 
          nfts.*,
          users.name as ownerName,
          users.email as ownerEmail,
          buyer.name as buyerName,
          buyer.email as buyerEmail
        FROM nfts
        LEFT JOIN users ON nfts.ownerId = users.id
        LEFT JOIN users as buyer ON nfts.buyerId = buyer.id
        ORDER BY nfts.id DESC
      `);
      
      if (!result[0]) {
        return res.json([]);
      }
      
      const nfts = result[0].values.map(row => {
        const nft = rowToObject(result[0].columns, row);
        return {
          ...nft,
          owner: { id: nft.ownerId, name: nft.ownerName, email: nft.ownerEmail },
          buyer: nft.buyerId ? { id: nft.buyerId, name: nft.buyerName, email: nft.buyerEmail } : null
        };
      });
      
      res.json(nfts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/buy/:id', auth, async (req, res) => {
    try {
      const db = getDb();
      const nftResult = db.exec('SELECT * FROM nfts WHERE id = ?', [req.params.id]);
      
      if (!nftResult[0] || !nftResult[0].values[0]) {
        return res.status(404).json({ message: 'NFT not found' });
      }
      
      const nft = rowToObject(nftResult[0].columns, nftResult[0].values[0]);
      
      if (nft.status !== 'available') {
        return res.status(400).json({ message: 'NFT not available' });
      }
      
      db.run('UPDATE nfts SET buyerId = ?, status = ? WHERE id = ?', [req.user.id, 'pending', req.params.id]);
      
      const updatedResult = db.exec('SELECT * FROM nfts WHERE id = ?', [req.params.id]);
      const updatedNFT = rowToObject(updatedResult[0].columns, updatedResult[0].values[0]);
      
      io.emit('nftUpdated', updatedNFT);
      res.json(updatedNFT);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/confirm/:id', auth, async (req, res) => {
    try {
      const db = getDb();
      const nftResult = db.exec('SELECT * FROM nfts WHERE id = ?', [req.params.id]);
      
      if (!nftResult[0] || !nftResult[0].values[0]) {
        return res.status(404).json({ message: 'NFT not found' });
      }
      
      const nft = rowToObject(nftResult[0].columns, nftResult[0].values[0]);
      
      if (nft.ownerId !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      if (nft.status !== 'pending') {
        return res.status(400).json({ message: 'No pending purchase' });
      }
      
      db.run('UPDATE nfts SET status = ? WHERE id = ?', ['sold', req.params.id]);
      
      const updatedResult = db.exec('SELECT * FROM nfts WHERE id = ?', [req.params.id]);
      const updatedNFT = rowToObject(updatedResult[0].columns, updatedResult[0].values[0]);
      
      io.emit('nftUpdated', updatedNFT);
      res.json(updatedNFT);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/rate/:id', auth, async (req, res) => {
    try {
      const { rating } = req.body;
      const db = getDb();
      const nftResult = db.exec('SELECT * FROM nfts WHERE id = ?', [req.params.id]);
      
      if (!nftResult[0] || !nftResult[0].values[0]) {
        return res.status(404).json({ message: 'NFT not found' });
      }
      
      const nft = rowToObject(nftResult[0].columns, nftResult[0].values[0]);
      
      const newRating = ((nft.rating * nft.ratingCount) + rating) / (nft.ratingCount + 1);
      const newRatingCount = nft.ratingCount + 1;
      
      db.run('UPDATE nfts SET rating = ?, ratingCount = ? WHERE id = ?', [newRating, newRatingCount, req.params.id]);
      
      const updatedResult = db.exec('SELECT * FROM nfts WHERE id = ?', [req.params.id]);
      const updatedNFT = rowToObject(updatedResult[0].columns, updatedResult[0].values[0]);
      
      io.emit('nftUpdated', updatedNFT);
      res.json(updatedNFT);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};
