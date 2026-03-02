function CryptoChart({ sparkline, change }) {
  if (!sparkline || sparkline.length === 0) return null

  const width = 120
  const height = 40
  const padding = 2

  const values = sparkline.map(v => parseFloat(v) || 0).filter(v => v > 0)
  if (values.length === 0) return null

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1

  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * (width - padding * 2) + padding
    const y = height - padding - ((value - min) / range) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')

  const color = change >= 0 ? '#22c55e' : '#ef4444'

  return (
    <svg width={width} height={height} style={{ marginTop: '10px' }}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={`gradient-${change}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <polygon
        points={`${padding},${height} ${points} ${width - padding},${height}`}
        fill={`url(#gradient-${change})`}
      />
    </svg>
  )
}

export default CryptoChart
