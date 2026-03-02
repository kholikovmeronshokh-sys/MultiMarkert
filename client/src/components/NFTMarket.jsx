import { useState, useEffect } from 'react'
import axios from 'axios'
import ChatModal from './ChatModal'

function NFTMarket({ user }) {
  const [nfts, setNfts] = useState([])
  const [ratingNFT, setRatingNFT] = useState(null)
  const [rating, setRating] = useState(5)
  const [chatNFT, setChatNFT] = useState(null)

  useEffect(() => {
    fetchNFTs()
    const interval = setInterval(fetchNFTs, 10000)
    return () => clearInterval(interval)
  }, [])

  const fetchNFTs = async () => {
    try {
      const response = await axios.get('https://multimarkert-production.up.railway.app/api/nft/all')
      setNfts(response.data)
    } catch (error) {
      console.error('Error fetching NFTs:', error)
    }
  }

  const handleBuy = async (nftId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `https://multimarkert-production.up.railway.app/api/nft/buy/${nftId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Purchase request sent! Chat with seller to complete the transaction.')
      fetchNFTs()
      const nft = nfts.find(n => n.id === nftId)
      setChatNFT(nft)
    } catch (error) {
      alert(error.response?.data?.message || 'Error purchasing NFT')
    }
  }

  const handleGift = async (nftId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `https://multimarkert-production.up.railway.app/api/nft/confirm/${nftId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('NFT gifted successfully!')
      setChatNFT(null)
      fetchNFTs()
    } catch (error) {
      alert(error.response?.data?.message || 'Error gifting NFT')
    }
  }

  const handleRate = async (nftId) => {
    try {
      const token = localStorage.getItem('token')
      await axios.post(
        `https://multimarkert-production.up.railway.app/api/nft/rate/${nftId}`,
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      alert('Rating submitted!')
      setRatingNFT(null)
      fetchNFTs()
    } catch (error) {
      alert('Error submitting rating')
    }
  }

  return (
    <div>
      <h2 className="page-title">
        🎨 NFT Marketplace
      </h2>
      
      {nfts.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '100px 20px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '24px',
          border: '2px dashed rgba(255, 215, 0, 0.3)'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎨</div>
          <h3 style={{ color: '#FFD700', fontSize: '28px', marginBottom: '15px' }}>
            No NFTs Found
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px' }}>
            Be the first to create an NFT!
          </p>
        </div>
      ) : (
        <div className="nft-grid">
          {nfts.map((nft) => (
            <div key={nft.id} className="nft-card">
              <img src={`https://multimarkert-production.up.railway.app/${nft.image}`} alt={nft.name} />
              <div className="nft-card-content">
                <h3>{nft.name}</h3>
                <div className="price">${nft.price}</div>
                <div className="rating">
                  ⭐ {nft.rating.toFixed(1)} ({nft.ratingCount} ratings)
                </div>
                <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', margin: '10px 0' }}>
                  📧 {nft.contactInfo}
                </p>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)' }}>
                  👤 {nft.owner.name}
                </p>
                <span className={`status-badge ${nft.status}`}>
                  {nft.status.toUpperCase()}
                </span>
                
                {nft.status === 'available' && nft.ownerId !== user.id && (
                  <button onClick={() => handleBuy(nft.id)}>Buy NFT</button>
                )}
                
                {nft.status === 'pending' && (nft.ownerId === user.id || nft.buyerId === user.id) && (
                  <button onClick={() => setChatNFT(nft)}>💬 Open Chat</button>
                )}
                
                {nft.status === 'sold' && nft.buyerId === user.id && (
                  <button onClick={() => setRatingNFT(nft.id)}>⭐ Rate NFT</button>
                )}
                
                {ratingNFT === nft.id && (
                  <div style={{ marginTop: '10px' }}>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        marginBottom: '8px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        border: '2px solid rgba(255, 215, 0, 0.3)',
                        borderRadius: '10px',
                        color: 'white'
                      }}
                    />
                    <button onClick={() => handleRate(nft.id)}>Submit Rating</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {chatNFT && (
        <ChatModal
          nft={chatNFT}
          user={user}
          onClose={() => setChatNFT(null)}
          onGift={() => handleGift(chatNFT.id)}
        />
      )}
    </div>
  )
}

export default NFTMarket
