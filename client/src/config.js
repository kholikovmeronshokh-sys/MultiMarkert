// API Configuration
export const API_URL = import.meta.env.PROD 
  ? window.location.origin 
  : 'http://localhost:5000'

export const API_BASE = import.meta.env.PROD 
  ? '/api' 
  : 'http://localhost:5000/api'
