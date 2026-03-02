import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import CryptoMarket from './components/CryptoMarket'
import NFTMarket from './components/NFTMarket'
import CreateNFT from './components/CreateNFT'
import TrendingNFTs from './components/TrendingNFTs'
import Profile from './components/Profile'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <Router>
      <div className="container">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={!user ? <Auth setUser={setUser} /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <CryptoMarket /> : <Navigate to="/login" />} />
          <Route path="/nft" element={user ? <NFTMarket user={user} /> : <Navigate to="/login" />} />
          <Route path="/create-nft" element={user ? <CreateNFT user={user} /> : <Navigate to="/login" />} />
          <Route path="/trending" element={user ? <TrendingNFTs /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
