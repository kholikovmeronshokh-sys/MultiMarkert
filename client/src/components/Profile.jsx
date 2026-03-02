import { useState, useEffect } from 'react'
import axios from 'axios'

function Profile({ user }) {
  const [myNFTs, setMyNFTs] = useState([])
  const [soldNFTs, setSoldNFTs] = useState([])
  const [boughtNFTs, setBoughtNFTs] = useState([])
  const [stats, setStats] = useState({
    totalCreated: 0,
    totalSold: 0,
    totalEarned: 0,
    totalSpent: 0
  })

  useEffect(() => {
    fetchUserNFTs()
  }, [])

  const fetchUserNFTs = async () => {
    try {
      const response = await axios.get('https://multimarkert-production.up.railway.app/api/nft/all')
      const allNFTs = response.data

      const created = allNFTs.filter(nft => nft.ownerId === user.id)
      const sold = allNFTs.filter(nft => nft.ownerId === user.id && nft.status === 'sold')
      const bought = allNFTs.filter(nft => nft.buyerId === user.id && nft.status === 'sold')

      setMyNFTs(created)
      setSoldNFTs(sold)
      setBoughtNFTs(bought)

      setStats({
        totalCreated: created.length,
        totalSold: sold.length,
        totalEarned: sold.reduce((sum, nft) => sum + parseFloat(nft.price), 0),
        totalSpent: bought.reduce((sum, nft) => sum + parseFloat(nft.price), 0)
      })
    } catch (error) {
      console.error('Error fetching user NFTs:', error)
    }
  }

  return (
    <div>
      <h2 className="page-title">
        👤 My Profile
      </h2>

      <div style={{
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(20, 25, 50, 0.9) 100%)',
        backdropFilter: 'blur(30px)',
        padding: '40px',
        borderRadius: '24px',
        marginBottom: '40px',
        border: '2px solid rgba(255, 215, 0, 0.3)',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '30px', flexWrap: 'wrap' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFD700, #FFA500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: '900',
            color: '#0a0e27',
            boxShadow: '0 8px 25px rgba(255, 215, 0, 0.5)'
          }}>
            {user.name[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: '#FFD700', fontSize: '36px', marginBottom: '10px' }}>
              {user.name}
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '18px', marginBottom: '10px' }}>
              📧 {user.email}
            </p>
            {user.isAdmin && (
              <span style={{
                background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                color: '#0a0e27',
                padding: '8px 16px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                display: 'inline-block'
              }}>
                👑 ADMIN
              </span>
            )}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            background: 'rgba(255, 215, 0, 0.1)',
            padding: '25px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 215, 0, 0.3)'
          }}>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
              NFTs Created
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#FFD700' }}>
              {stats.totalCreated}
            </div>
          </div>

          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            padding: '25px',
            borderRadius: '16px',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
              NFTs Sold
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#22c55e' }}>
              {stats.totalSold}
            </div>
          </div>

          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            padding: '25px',
            borderRadius: '16px',
            border: '1px solid rgba(34, 197, 94, 0.3)'
          }}>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
              Total Earned
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#22c55e' }}>
              ${stats.totalEarned.toFixed(2)}
            </div>
          </div>

          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '25px',
            borderRadius: '16px',
            border: '1px solid rgba(239, 68, 68, 0.3)'
          }}>
            <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
              Total Spent
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#ef4444' }}>
              ${stats.totalSpent.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ color: '#FFD700', fontSize: '28px', marginBottom: '20px' }}>
        🎨 My Collections
      </h3>

      {myNFTs.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '24px',
          border: '2px dashed rgba(255, 215, 0, 0.3)'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🎨</div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '16px' }}>
            You haven't created any NFTs yet
          </p>
        </div>
      ) : (
        <div className="nft-grid">
          {myNFTs.map((nft) => (
            <div key={nft.id} className="nft-card">
              <img src={`https://multimarkert-production.up.railway.app/${nft.image}`} alt={nft.name} />
              <div className="nft-card-content">
                <h3>{nft.name}</h3>
                <div className="price">${nft.price}</div>
                <div className="rating">
                  ⭐ {nft.rating.toFixed(1)} ({nft.ratingCount} ratings)
                </div>
                <span className={`status-badge ${nft.status}`}>
                  {nft.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {boughtNFTs.length > 0 && (
        <>
          <h3 style={{ color: '#FFD700', fontSize: '28px', marginTop: '40px', marginBottom: '20px' }}>
            🛍️ Purchased NFTs
          </h3>
          <div className="nft-grid">
            {boughtNFTs.map((nft) => (
              <div key={nft.id} className="nft-card">
                <img src={`https://multimarkert-production.up.railway.app/${nft.image}`} alt={nft.name} />
                <div className="nft-card-content">
                  <h3>{nft.name}</h3>
                  <div className="price">${nft.price}</div>
                  <div className="rating">
                    ⭐ {nft.rating.toFixed(1)} ({nft.ratingCount} ratings)
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '10px' }}>
                    From: {nft.owner.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Profile
