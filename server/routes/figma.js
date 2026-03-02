const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/designs', async (req, res) => {
  try {
    const response = await axios.get('https://api.figma.com/v1/files/YOUR_FILE_KEY', {
      headers: {
        'X-Figma-Token': process.env.FIGMA_CLIENT_SECRET
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Figma API error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching Figma designs' });
  }
});

module.exports = router;
