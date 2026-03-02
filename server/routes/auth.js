const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function rowToObject(columns, values) {
  const obj = {};
  columns.forEach((col, idx) => {
    obj[col] = values[idx];
  });
  return obj;
}

module.exports = (getDb) => {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const db = getDb();
      
      const existingResult = db.exec('SELECT * FROM users WHERE email = ?', [email]);
      if (existingResult[0] && existingResult[0].values.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      const isAdmin = email === process.env.ADMIN_EMAIL ? 1 : 0;
      const nftLimit = isAdmin ? 999999 : 1;
      
      db.run(
        'INSERT INTO users (name, email, password, isAdmin, nftLimit) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, isAdmin, nftLimit]
      );
      
      const userResult = db.exec('SELECT * FROM users WHERE email = ?', [email]);
      const user = rowToObject(userResult[0].columns, userResult[0].values[0]);
      
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin === 1,
          nftLimit: user.nftLimit
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const db = getDb();
      
      const result = db.exec('SELECT * FROM users WHERE email = ?', [email]);
      if (!result[0] || !result[0].values[0]) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      const user = rowToObject(result[0].columns, result[0].values[0]);
      
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin === 1,
          nftLimit: user.nftLimit
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return router;
};
