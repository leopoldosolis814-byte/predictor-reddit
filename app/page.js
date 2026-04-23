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
      alert("Error al conectar con la IA")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen flex items-center justify-center p-6">
      <Background />

      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] p-8 md:p-14 shadow-2xl transition-all">
        
        {/* Cabecera */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
            Predictor <span className="text-orange-500">Startup</span>
          </h1>
          <p className="text-white/50 text-sm tracking-widest uppercase">Validación con Llama 3 & Groq</p>
        </div>

        {/* Pantalla de Entrada */}
        {!result && !loading && (
          <div className="space-y-6">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Ej: Una plataforma para alquilar herramientas entre vecinos..."
              className="w-full p-6 rounded-3xl bg-black/20 border border-white/10 text-white placeholder:text-white/20 outline-none focus:ring-2 focus:ring-orange-500/40 transition-all h-44 resize-none text-lg"
            />
            <button 
              onClick={handleAnalizar}
              disabled={!idea}
              className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-orange-900/20 active:scale-95 disabled:opacity-30"
            >
              ANALIZAR IDEA
            </button>
          </div>
        )}

        {/* Pantalla de Carga */}
        {loading && (
          <div className="text-center py-20 space-y-4">
            <div className="w-16 h-16 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto" />
            <p className="text-orange-500 font-bold animate-pulse tracking-widest">PROCESANDO CON GROQ...</p>
          </div>
        )}

        {/* Pantalla de Resultados Profesionales */}
        {result && (
          <div className="space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">{result.titulo}</h2>
              <div className="bg-orange-500 text-black font-black px-4 py-1 rounded-full text-xl">
                {result.score}%
              </div>
            </div>

            {/* Barra de Progreso */}
            <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-1000"
                style={{ width: `${result.score}%` }}
              />
            </div>

            <div className="grid gap-6 text-left">
              <div className="bg-white/5 p-6 rounded-3xl border border-white/5">
                <h3 className="text-orange-500 font-bold text-xs uppercase mb-2">Análisis de Mercado</h3>
                <p className="text-white/80 leading-relaxed">{result.analisis}</p>
              </div>

              <div className="bg-orange-500/10 p-6 rounded-3xl border border-orange-500/20">
                <h3 className="text-orange-400 font-bold text-xs uppercase mb-2">Pivote Sugerido</h3>
                <p className="text-orange-100 font-medium italic">"{result.pivote}"</p>
              </div>
            </div>

            <button 
              onClick={() => setResult(null)}
              className="w-full py-4 border border-white/10 text-white/50 hover:text-white rounded-2xl transition-all text-sm font-bold"
            >
              NUEVO ANÁLISIS
            </button>
          </div>
        )}
      </div>
    </main>
  )
    }
