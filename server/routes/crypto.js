const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/prices', async (req, res) => {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
      },
      params: {
        limit: 100,
        convert: 'USD'
      }
    });
    
    const prices = response.data.data.map(crypto => ({
      name: crypto.name,
      symbol: crypto.symbol,
      price: crypto.quote.USD.price,
      change_24h: crypto.quote.USD.percent_change_24h,
      market_cap: crypto.quote.USD.market_cap,
      volume_24h: crypto.quote.USD.volume_24h
    }));
    
    res.json(prices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
