import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api'

function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register'
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData)
      
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      setUser(response.data.user)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    }
  }

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p style={{ color: '#ef4444', marginBottom: '15px', textAlign: 'center', fontWeight: '600' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center', color: 'rgba(255, 255, 255, 0.8)' }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
          style={{ color: '#FFD700', cursor: 'pointer', fontWeight: 'bold' }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Register' : 'Login'}
        </span>
      </p>
    </div>
  )
}

export default Auth
