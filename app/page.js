'use client'
import { useState } from 'react'

export default function Home() {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalizar = async () => {
    if (!idea) return
    setLoading(true)
    try {
      const res = await fetch('/api/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      })
      const data = await res.json()
      setResult(data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  return (
    <div style={{backgroundColor: '#111', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif'}}>
      <h1 style={{textAlign: 'center', color: '#f97316'}}>PREDICTOR STARTUP</h1>
      <div style={{maxWidth: '500px', margin: '0 auto', background: '#222', padding: '20px', borderRadius: '20px'}}>
        <textarea 
          value={idea} 
          onChange={(e) => setIdea(e.target.value)}
          style={{width: '100%', height: '100px', borderRadius: '10px', padding: '10px', marginBottom: '10px'}}
          placeholder="Tu idea aquí..."
        />
        <button onClick={handleAnalizar} style={{width: '100%', padding: '15px', background: '#f97316', border: 'none', borderRadius: '10px', fontWeight: 'bold', color: 'white'}}>
          {loading ? 'ANALIZANDO...' : 'VALIDAR'}
        </button>
        {result && (
          <div style={{marginTop: '20px', borderTop: '1px solid #444', paddingTop: '20px'}}>
            <h3>{result.titulo} - {result.score}%</h3>
            <p>{result.analisis}</p>
          </div>
        )}
      </div>
    </div>
  )
  }
