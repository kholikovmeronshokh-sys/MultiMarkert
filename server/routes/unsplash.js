const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/random', async (req, res) => {
  try {
    const { query = 'crypto,nft,blockchain', count = 10 } = req.query;
    
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      },
      params: {
        query,
        count,
        orientation: 'landscape'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Unsplash API error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching images' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const { query = 'crypto', page = 1, per_page = 20 } = req.query;
    
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      headers: {
        'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      },
      params: {
        query,
        page,
        per_page,
        orientation: 'landscape'
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Unsplash search error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error searching images' });
  }
});

module.exports = router;
