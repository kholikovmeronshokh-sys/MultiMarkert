import { useNavigate } from 'react-router-dom'

function Navbar({ user, onLogout }) {
  const navigate = useNavigate()

  return (
    <div className="navbar">
      <h1>MultiMarket 2026</h1>
      {user && (
        <nav>
          <button onClick={() => navigate('/')}>Crypto Market</button>
          <button onClick={() => navigate('/trending')}>Trending NFTs</button>
          <button onClick={() => navigate('/nft')}>NFT Market</button>
          <button onClick={() => navigate('/create-nft')}>Create NFT</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={onLogout}>Logout</button>
        </nav>
      )}
    </div>
  )
}

export default Navbar
