import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateNFT({ user }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    contactInfo: '',
    image: null
  })
  const [preview, setPreview] = useState(null)
  const [unsplashImages, setUnsplashImages] = useState([])
  const [showUnsplash, setShowUnsplash] = useState(false)
  const [searchQuery, setSearchQuery] = useState('crypto art')

  const searchUnsplash = async () => {
    try {
      const response = await axios.get(`https://multimarkert-production.up.railway.app/api/unsplash/search?query=${searchQuery}&per_page=12`)
      setUnsplashImages(response.data.results || [])
      setShowUnsplash(true)
    } catch (error) {
      console.error('Error searching Unsplash:', error)
    }
  }

  const selectUnsplashImage = async (imageUrl) => {
    setPreview(imageUrl)
    setShowUnsplash(false)
    
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const file = new File([blob], 'unsplash-image.jpg', { type: 'image/jpeg' })
    setFormData({ ...formData, image: file })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFormData({ ...formData, image: file })
    
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('name', formData.name)
    data.append('price', formData.price)
    data.append('contactInfo', formData.contactInfo)
    data.append('image', formData.image)

    try {
      const token = localStorage.getItem('token')
      await axios.post('https://multimarkert-production.up.railway.app/api/nft/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      alert('NFT created successfully!')
      navigate('/nft')
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating NFT')
    }
  }

  return (
    <div className="create-nft-form">
      <h2>🎨 Create New NFT</h2>
      {user.isAdmin && (
        <p style={{ color: '#22c55e', marginBottom: '15px', fontWeight: '600', textAlign: 'center' }}>
          ✓ Admin: Unlimited NFT creation
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="NFT Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price (USD)"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Contact Info (email, telegram, etc.)"
          value={formData.contactInfo}
          onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
          required
        />
        
        <div style={{ marginBottom: '20px' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Search Unsplash (e.g., crypto art, nft)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              onClick={searchUnsplash}
              style={{ 
                padding: '12px 20px',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                whiteSpace: 'nowrap'
              }}
            >
              🔍 Search Images
            </button>
          </div>
        </div>

        {showUnsplash && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            marginBottom: '20px',
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {unsplashImages.map((img, index) => (
              <img
                key={index}
                src={img.urls.small}
                alt={img.alt_description}
                onClick={() => selectUnsplashImage(img.urls.regular)}
                style={{
                  width: '100%',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.borderColor = '#FFD700'}
                onMouseOut={(e) => e.target.style.borderColor = 'transparent'}
              />
            ))}
          </div>
        )}

        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{ width: '100%', marginTop: '15px', borderRadius: '12px', boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)' }}
          />
        )}
        <button type="submit" style={{ marginTop: '20px' }}>Create NFT</button>
      </form>
    </div>
  )
}

export default CreateNFT
