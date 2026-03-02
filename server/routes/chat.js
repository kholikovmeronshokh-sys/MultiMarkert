const express = require('express');
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

  router.post('/send', auth, async (req, res) => {
    try {
      const { nftId, message } = req.body;
      const db = getDb();
      
      db.run(
        'INSERT INTO messages (nftId, senderId, message) VALUES (?, ?, ?)',
        [nftId, req.user.id, message]
      );
      
      const result = db.exec(`
        SELECT messages.*, users.name as senderName
        FROM messages
        LEFT JOIN users ON messages.senderId = users.id
        WHERE messages.id = last_insert_rowid()
      `);
      
      const msg = rowToObject(result[0].columns, result[0].values[0]);
      
      io.emit(`chat:${nftId}`, msg);
      res.json(msg);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/messages/:nftId', auth, async (req, res) => {
    try {
      const db = getDb();
      const result = db.exec(`
        SELECT messages.*, users.name as senderName
        FROM messages
        LEFT JOIN users ON messages.senderId = users.id
        WHERE messages.nftId = ?
        ORDER BY messages.createdAt ASC
      `, [req.params.nftId]);
      
      if (!result[0]) {
        return res.json([]);
      }
      
      const messages = result[0].values.map(row => rowToObject(result[0].columns, row));
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};
