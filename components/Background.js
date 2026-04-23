'use client'
import { useState, useEffect } from 'react'

const IMAGENES = [
  "https://res.cloudinary.com/ds2udm1nc/image/upload/v1776915712/Copilot_20260423_000714_yreyre.png",
  "https://res.cloudinary.com/ds2udm1nc/image/upload/v1776915710/Copilot_20260423_000306_xucvfd.png", 
  "https://res.cloudinary.com/ds2udm1nc/image/upload/v1776915709/Copilot_20260423_000431_k2gk4n.png",
  "https://res.cloudinary.com/ds2udm1nc/image/upload/v1776915707/Copilot_20260422_235149_gx07ic.png"
]

export default function Background() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(prev => (prev + 1) % IMAGENES.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {IMAGENES.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-[3000ms] ease-in-out"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === index ? 0.5 : 0,
            transform: i === index ? 'scale(1.1)' : 'scale(1)',
          }}
        />
      ))}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
    </div>
  )
}
