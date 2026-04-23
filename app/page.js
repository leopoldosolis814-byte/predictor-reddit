'use client'
import { useState } from 'react'
import Background from '../components/Background'

export default function Home() {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalizar = async () => {
    if (!idea) return
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch('/api/analizar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      })
      const data = await res.json()
      setResult(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6 text-white font-sans">
      <Background />
      <div className="w-full max-w-2xl bg-black/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
        <h1 className="text-4xl font-black text-center mb-8 tracking-tighter">
          PREDICTOR <span className="text-orange-500">STARTUP</span>
        </h1>
        
        {!result && !loading && (
          <div className="space-y-4">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe tu idea..."
              className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 outline-none focus:ring-2 focus:ring-orange-500 h-40 resize-none text-lg"
            />
            <button 
              onClick={handleAnalizar}
              className="w-full py-4 bg-orange-600 hover:bg-orange-500 font-bold rounded-xl transition-all"
            >
              VALIDAR AHORA
            </button>
          </div>
        )}

        {loading && <div className="text-center py-10 animate-pulse text-orange-500 font-bold">ANALIZANDO CON IA...</div>}

        {result && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
              <h2 className="text-xl font-bold">{result.titulo}</h2>
              <span className="text-2xl font-black text-orange-500">{result.score}%</span>
            </div>
            <p className="text-white/70 leading-relaxed">{result.analisis}</p>
            <div className="p-4 bg-orange-500/20 border border-orange-500/30 rounded-xl">
              <p className="text-orange-200 italic">"Pivote: {result.pivote}"</p>
            </div>
            <button onClick={() => setResult(null)} className="w-full text-sm text-white/40 hover:text-white uppercase font-bold tracking-widest">Reiniciar</button>
          </div>
        )}
      </div>
    </main>
  )
          }
