import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import CryptoChart from './CryptoChart'

const API_URL = import.meta.env.PROD ? '' : 'https://multimarkert-production.up.railway.app'
const socket = io(API_URL || window.location.origin, {
  transports: ['polling', 'websocket']
})

function CryptoMarket() {
  const [cryptos, setCryptos] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    socket.on('cryptoPrices', (prices) => {
      console.log('Received crypto prices:', prices.length)
      setCryptos(prices)
    })

    socket.on('connect', () => {
      console.log('Socket connected')
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    return () => {
      socket.off('cryptoPrices')
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  const filteredCryptos = cryptos.filter(crypto => {
    const matchesSearch = crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (!matchesSearch) return false
    
    if (filter === 'gainers') return crypto.change_24h > 0
    if (filter === 'losers') return crypto.change_24h < 0
    return true
  })

  return (
    <div>
      <h2 className="page-title">
        🚀 Real-Time Crypto Market - Top 100
      </h2>
      
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Search crypto (e.g., Bitcoin, BTC)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '15px 20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 215, 0, 0.3)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '16px',
            marginBottom: '20px'
          }}
        />
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setFilter('all')}
            style={{
              padding: '12px 24px',
              background: filter === 'all' ? 'linear-gradient(135deg, #FFD700, #FFA500)' : 'rgba(255, 255, 255, 0.1)',
              color: filter === 'all' ? '#1a1a2e' : '#fff',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            All ({cryptos.length})
          </button>
          <button 
            onClick={() => setFilter('gainers')}
            style={{
              padding: '12px 24px',
              background: filter === 'gainers' ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            🔥 Gainers
          </button>
          <button 
            onClick={() => setFilter('losers')}
            style={{
              padding: '12px 24px',
              background: filter === 'losers' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s'
            }}
          >
            📉 Losers
          </button>
        </div>
      </div>

      <div className="crypto-grid">
        {filteredCryptos.map((crypto) => (
          <div key={crypto.id} className="crypto-card">
            <div className="crypto-rank">#{crypto.rank}</div>
            <div className="crypto-card-header">
              <div className="crypto-logo-wrapper">
                <img 
                  src={crypto.image} 
                  alt={crypto.symbol}
                  className="crypto-logo-img"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="crypto-logo" style={{ display: 'none' }}>
                  {crypto.symbol[0]}
                </div>
              </div>
              <div>
                <h3>{crypto.name}</h3>
                <div className="symbol">{crypto.symbol}</div>
              </div>
            </div>
            <div className="price">${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</div>
            <div className={`change ${crypto.change_24h >= 0 ? 'positive' : 'negative'}`}>
              {crypto.change_24h >= 0 ? '▲' : '▼'} {Math.abs(crypto.change_24h).toFixed(2)}% (24h)
            </div>
            
            <CryptoChart sparkline={crypto.sparkline} change={crypto.change_24h} />
            
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Market Cap</span>
                <span className="stat-value">${(crypto.market_cap / 1e9).toFixed(2)}B</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Volume 24h</span>
                <span className="stat-value">${(crypto.volume_24h / 1e6).toFixed(2)}M</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CryptoMarket
