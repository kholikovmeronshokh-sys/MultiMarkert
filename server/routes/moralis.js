const express = require('express');
const router = express.Router();
const axios = require('axios');

const NFTSCAN_API_KEY = process.env.NFTSCAN_API_KEY;

router.get('/trending-collections', async (req, res) => {
  try {
    const response = await axios.get('https://restapi.nftscan.com/api/v2/statistics/ranking/trade', {
      headers: {
        'X-API-KEY': NFTSCAN_API_KEY
      },
      params: {
        chain: 'eth',
        time: '1d',
        sort_field: 'volume',
        sort_direction: 'desc',
        limit: 50
      }
    });
    
    console.log('NFTScan response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('NFTScan error:', error.response?.data || error.message);
    
    const mockData = {
      content: [
        {
          contract_address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
          contract_name: 'Bored Ape Yacht Club',
          logo_url: 'https://logo.nftscan.com/logo/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d.png',
          floor_price: '15.5',
          volume_1d: '2500000',
          volume_change_1d: '5.2',
          sales_1d: 125
        },
        {
          contract_address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
          contract_name: 'CryptoPunks',
          logo_url: 'https://logo.nftscan.com/logo/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb.png',
          floor_price: '45.2',
          volume_1d: '1800000',
          volume_change_1d: '-2.1',
          sales_1d: 89
        },
        {
          contract_address: '0x60e4d786628fea6478f785a6d7e704777c86a7c6',
          contract_name: 'Mutant Ape Yacht Club',
          logo_url: 'https://logo.nftscan.com/logo/0x60e4d786628fea6478f785a6d7e704777c86a7c6.png',
          floor_price: '8.3',
          volume_1d: '950000',
          volume_change_1d: '12.5',
          sales_1d: 234
        },
        {
          contract_address: '0xed5af388653567af2f388e6224dc7c4b3241c544',
          contract_name: 'Azuki',
          logo_url: 'https://logo.nftscan.com/logo/0xed5af388653567af2f388e6224dc7c4b3241c544.png',
          floor_price: '12.1',
          volume_1d: '780000',
          volume_change_1d: '8.9',
          sales_1d: 156
        },
        {
          contract_address: '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b',
          contract_name: 'CloneX',
          logo_url: 'https://logo.nftscan.com/logo/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b.png',
          floor_price: '5.7',
          volume_1d: '650000',
          volume_change_1d: '-3.4',
          sales_1d: 198
        }
      ]
    };
    
    res.json(mockData);
  }
});

router.get('/wallet-nfts/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const response = await axios.get(`https://restapi.nftscan.com/api/v2/account/own/${address}`, {
      headers: {
        'X-API-KEY': NFTSCAN_API_KEY
      },
      params: {
        erc_type: 'erc721',
        show_attribute: 'true',
        limit: 20
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('NFTScan wallet NFTs error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching wallet NFTs', error: error.message });
  }
});

router.get('/collection-stats/:address', async (req, res) => {
  try {
    const { address } = req.params;
    const response = await axios.get(`https://restapi.nftscan.com/api/v2/statistics/collection/${address}`, {
      headers: {
        'X-API-KEY': NFTSCAN_API_KEY
      }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('NFTScan collection stats error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching collection stats', error: error.message });
  }
});

module.exports = router;

