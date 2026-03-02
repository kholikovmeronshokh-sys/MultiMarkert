const jwt = require('jsonwebtoken');

module.exports = (getDb) => {
  return (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        throw new Error();
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const db = getDb();
      const result = db.exec('SELECT * FROM users WHERE id = ?', [decoded.userId]);
      
      if (!result[0] || !result[0].values[0]) {
        throw new Error();
      }
      
      const columns = result[0].columns;
      const values = result[0].values[0];
      const user = {};
      columns.forEach((col, idx) => {
        user[col] = values[idx];
      });
      
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Please authenticate' });
    }
  };
};

