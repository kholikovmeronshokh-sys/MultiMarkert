import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import io from 'socket.io-client'

const socket = io('https://multimarkert-production.up.railway.app')

function ChatModal({ nft, user, onClose, onGift }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef(null)

  useEffect(() => {
    fetchMessages()
    
    socket.on(`chat:${nft.id}`, (message) => {
      setMessages(prev => [...prev, message])
    })

    return () => {
      socket.off(`chat:${nft.id}`)
    }
  }, [nft.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`https://multimarkert-production.up.railway.app/api/chat/messages/${nft.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessages(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const token = localStorage.getItem('token')
      await axios.post('https://multimarkert-production.up.railway.app/api/chat/send', {
        nftId: nft.id,
        message: newMessage
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setNewMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.98) 0%, rgba(20, 25, 50, 0.95) 100%)',
        backdropFilter: 'blur(30px)',
        borderRadius: '24px',
        padding: '30px',
        maxWidth: '600px',
        width: '100%',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        border: '2px solid rgba(255, 215, 0, 0.3)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#FFD700', margin: 0 }}>💬 Chat - {nft.name}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              color: 'white',
              fontSize: '24px',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        {nft.status === 'pending' && nft.ownerId === user.id && (
          <button
            onClick={onGift}
            style={{
              padding: '15px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '20px',
              fontSize: '16px'
            }}
          >
            🎁 Gift NFT to Buyer
          </button>
        )}

        <div style={{
          flex: 1,
          overflowY: 'auto',
          marginBottom: '20px',
          padding: '15px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          minHeight: '300px'
        }}>
          {messages.length === 0 ? (
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center' }}>
              No messages yet. Start the conversation!
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '15px',
                  padding: '12px',
                  background: msg.senderId === user.id 
                    ? 'linear-gradient(135deg, #FFD700, #FFA500)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: msg.senderId === user.id ? '#0a0e27' : 'white',
                  marginLeft: msg.senderId === user.id ? 'auto' : '0',
                  marginRight: msg.senderId === user.id ? '0' : 'auto',
                  maxWidth: '70%'
                }}
              >
                <div style={{ fontWeight: '600', marginBottom: '5px', fontSize: '14px' }}>
                  {msg.senderName}
                </div>
                <div>{msg.message}</div>
                <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '5px' }}>
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '15px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '2px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '16px'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #FFD700, #FFA500)',
              color: '#0a0e27',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatModal
