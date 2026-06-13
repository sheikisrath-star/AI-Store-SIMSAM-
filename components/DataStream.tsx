'use client'

import { useEffect, useRef } from 'react'

export default function DataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = 0, H = 0

    interface Particle {
      x: number; y: number
      vx: number; vy: number
      age: number; maxLife: number
      size: number; isLine: boolean; col: string
    }

    const particles: Particle[] = []

    function resize() {
      W = canvas!.width  = window.innerWidth
      H = canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function makeParticle(): Particle {
      const maxLife = Math.random() * 200 + 100
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * 0.6 + 0.2,
        age: Math.random() * maxLife,
        maxLife,
        size: Math.random() * 1.4 + 0.3,
        isLine: Math.random() > 0.72,
        col: Math.random() > 0.18 ? '0,229,197' : '255,0,119',
      }
    }

    for (let i = 0; i < 160; i++) particles.push(makeParticle())

    function drawGrid() {
      if (!ctx) return
      ctx.strokeStyle = 'rgba(0,229,197,0.025)'
      ctx.lineWidth = 0.5
      const gx = 80, gy = 80
      for (let x = 0; x < W; x += gx) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += gy) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, W, H)
      drawGrid()

      for (const p of particles) {
        p.x += p.vx; p.y += p.vy; p.age++
        if (p.age > p.maxLife || p.y > H + 10) Object.assign(p, makeParticle())

        const alpha = (1 - p.age / p.maxLife) * 0.45
        ctx.globalAlpha = alpha

        if (p.isLine) {
          ctx.strokeStyle = `rgba(${p.col},1)`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x + p.vx * 18, p.y + p.vy * 18)
          ctx.stroke()
        } else {
          ctx.fillStyle = `rgba(${p.col},1)`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.38,
      }}
    />
  )
}
