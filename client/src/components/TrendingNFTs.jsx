import { useState, useEffect } from 'react'
import axios from 'axios'

function TrendingNFTs() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [walletAddress, setWalletAddress] = useState('')
  const [walletNFTs, setWalletNFTs] = useState([])

  useEffect(() => {
    fetchTrendingCollections()
    const interval = setInterval(fetchTrendingCollections, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchTrendingCollections = async () => {
    try {
      setLoading(true)
      const response = await axios.get('https://multimarkert-production.up.railway.app/api/moralis/trending-collections')
      console.log('Trending collections response:', response.data)
      
      let collectionsData = []
      
      // Handle different response structures
      if (response.data.content && Array.isArray(response.data.content)) {
        collectionsData = response.data.content
      } else if (Array.isArray(response.data)) {
        collectionsData = response.data
      } else if (response.data.result && Array.isArray(response.data.result)) {
        collectionsData = response.data.result
      } else if (response.data.data && Array.isArray(response.data.data)) {
        collectionsData = response.data.data
      }
      
      console.log('Parsed collections data:', collectionsData)
      setCollections(collectionsData.slice(0, 20))
    } catch (error) {
      console.error('Error fetching trending collections:', error)
      // Set empty array on error so UI shows "no collections" message
      setCollections([])
    } finally {
      setLoading(false)
    }
  }

  const searchWalletNFTs = async () => {
    if (!walletAddress) return
    
    try {
      setLoading(true)
      const response = await axios.get(`https://multimarkert-production.up.railway.app/api/moralis/wallet-nfts/${walletAddress}`)
      setWalletNFTs(response.data.content || response.data.result || [])
    } catch (error) {
      console.error('Error fetching wallet NFTs:', error)
      alert('Error fetching wallet NFTs. Please check the address.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2 className="page-title">
        🔥 Trending NFT Collections
      </h2>

      <div style={{ 
        background: 'rgba(0, 0, 0, 0.4)', 
        backdropFilter: 'blur(20px)',
        padding: '30px',
        borderRadius: '20px',
        marginBottom: '30px',
        border: '1px solid rgba(255, 215, 0, 0.2)'
      }}>
        <h3 style={{ color: '#FFD700', marginBottom: '20px', fontSize: '24px' }}>
          🔍 Search Wallet NFTs
        </h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Enter Ethereum wallet address (0x...)"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            style={{
              flex: 1,
              minWidth: '300px',
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px'
            }}
          />
          <button
            onClick={searchWalletNFTs}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#1a1a2e',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#FFD700', fontSize: '24px', padding: '50px' }}>
          ⏳ Loading trending collections...
        </div>
      ) : walletNFTs.length > 0 ? (
        <>
          <h3 style={{ color: '#FFD700', marginBottom: '20px', fontSize: '28px' }}>
            Wallet NFTs ({walletNFTs.length})
          </h3>
          <div className="nft-grid">
            {walletNFTs.map((nft, index) => (
              <div key={index} className="nft-card">
                <img 
                  src={nft.image_uri || nft.normalized_metadata?.image || 'https://via.placeholder.com/300'} 
                  alt={nft.name || nft.contract_name || 'NFT'}
                  onError={(e) => e.target.src = 'https://via.placeholder.com/300'}
                />
                <div className="nft-card-content">
                  <h3>{nft.name || nft.contract_name || `Token #${nft.token_id}`}</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginTop: '10px' }}>
                    {nft.description?.substring(0, 100) || nft.normalized_metadata?.description?.substring(0, 100) || 'No description'}
                  </p>
                  <div style={{ marginTop: '15px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>
                    Token ID: {nft.token_id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : collections.length > 0 ? (
        <>
          <h3 style={{ color: '#FFD700', marginBottom: '20px', fontSize: '28px' }}>
            Top Collections ({collections.length})
          </h3>
          <div className="crypto-grid">
            {collections.map((collection, index) => (
              <div key={index} className="crypto-card">
                <div className="crypto-rank">#{index + 1}</div>
                <div className="crypto-card-header">
                  <div className="crypto-logo-wrapper">
                    {collection.logo_url && (
                      <img 
                        src={collection.logo_url} 
                        alt={collection.contract_name}
                        className="crypto-logo-img"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                    )}
                    <div className="crypto-logo" style={{ display: collection.logo_url ? 'none' : 'flex', fontSize: '28px' }}>
                      🎨
                    </div>
                  </div>
                  <div>
                    <h3>{collection.contract_name || collection.collection_title || 'Unknown Collection'}</h3>
                    <div className="symbol">{collection.contract_address?.substring(0, 8)}...</div>
                  </div>
                </div>
                <div className="stats">
                  <div className="stat-item">
                    <span className="stat-label">Floor Price</span>
                    <span className="stat-value">
                      {collection.floor_price ? `${parseFloat(collection.floor_price).toFixed(2)} ETH` : 
                       collection.floor_price_usd ? `$${collection.floor_price_usd.toFixed(2)}` : 'N/A'}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Volume 24h</span>
                    <span className="stat-value">
                      {collection.volume_1d ? `$${(parseFloat(collection.volume_1d) / 1e6).toFixed(2)}M` :
                       collection.volume_usd_24h ? `$${(collection.volume_usd_24h / 1e6).toFixed(2)}M` : 'N/A'}
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Change 24h</span>
                    <span className={`stat-value ${(collection.volume_change_1d || collection.floor_price_usd_24h_percent_change || 0) >= 0 ? 'positive' : 'negative'}`}>
                      {collection.volume_change_1d || collection.floor_price_usd_24h_percent_change
                        ? `${(collection.volume_change_1d || collection.floor_price_usd_24h_percent_change) >= 0 ? '▲' : '▼'} ${Math.abs(collection.volume_change_1d || collection.floor_price_usd_24h_percent_change).toFixed(2)}%`
                        : 'N/A'}
                    </span>
                  </div>
                  {collection.sales_1d && (
                    <div className="stat-item">
                      <span className="stat-label">Sales 24h</span>
                      <span className="stat-value">{collection.sales_1d}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '100px 20px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '24px',
          border: '2px dashed rgba(255, 215, 0, 0.3)'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎨</div>
          <h3 style={{ color: '#FFD700', fontSize: '28px', marginBottom: '15px' }}>
            No Collections Available
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px' }}>
            Unable to fetch trending NFT collections. Showing mock data.
          </p>
        </div>
      )}
    </div>
  )
}

export default TrendingNFTs
