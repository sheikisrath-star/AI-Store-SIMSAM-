'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { Product } from '@/lib/data'

export default function ProductCard({ product, hot }: { product: Product; hot?: boolean }) {
  const { addItem } = useCartStore()
  const [added, setAdded] = useState(false)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const isHot = hot || product.badge === 'Hot' || product.badge === 'Premium'
  const accentColor = isHot ? 'var(--magenta)' : 'var(--neon)'
  const accentRgb   = isHot ? '255,0,119'      : '0,229,197'

  return (
    <Link
      href={`/product/${product.id}`}
      className="block group"
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          background: 'var(--card-bg)',
          border: `1px solid rgba(${accentRgb},0.22)`,
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.3s ease',
          boxShadow: `0 0 18px rgba(${accentRgb},0.05)`,
          cursor: 'pointer',
        }}
        className="product-card-root"
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = 'translateY(-5px)'
          el.style.borderColor = `rgba(${accentRgb},0.55)`
          el.style.boxShadow = `0 16px 48px rgba(${accentRgb},0.16), 0 0 0 1px rgba(${accentRgb},0.28)`
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement
          el.style.transform = ''
          el.style.borderColor = `rgba(${accentRgb},0.22)`
          el.style.boxShadow = `0 0 18px rgba(${accentRgb},0.05)`
        }}
      >
        {/* Top glow line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: `linear-gradient(to right,transparent,${accentColor},transparent)`,
          opacity: 0.55,
          zIndex: 1,
        }} />

        {/* Product image area */}
        <div
          className={`h-40 flex items-center justify-center text-5xl bg-gradient-to-br ${product.gradient}`}
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Subtle grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `repeating-linear-gradient(0deg,rgba(${accentRgb},0.03) 0,rgba(${accentRgb},0.03) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(${accentRgb},0.03) 0,rgba(${accentRgb},0.03) 1px,transparent 1px,transparent 40px)`,
          }} />

          {product.badge && (
            <span
              style={{
                position: 'absolute', top: '10px', left: '10px',
                fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
                padding: '0.22rem 0.6rem',
                clipPath: 'polygon(4px 0,100% 0,calc(100% - 4px) 100%,0 100%)',
                background: isHot ? 'var(--magenta)' : 'var(--neon)',
                color: isHot ? '#fff' : '#000',
                zIndex: 2,
              }}
            >
              {product.badge}
            </span>
          )}

          <span
            style={{
              fontSize: '2.8rem',
              position: 'relative', zIndex: 1,
              filter: `drop-shadow(0 0 12px ${accentColor})`,
              transition: 'transform 0.3s ease',
            }}
          >
            {product.emoji}
          </span>
        </div>

        {/* Info */}
        <div style={{ padding: '1rem 1.1rem 1.25rem' }}>
          <div style={{
            fontSize: '0.62rem', letterSpacing: '0.12em',
            color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px',
          }}>
            {product.category}
          </div>

          <h3 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', marginBottom: '4px', lineHeight: 1.35 }}>
            {product.name}
          </h3>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginBottom: '0.85rem', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.tagline}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <div style={{
                fontFamily: 'Orbitron,system-ui',
                fontSize: '1.1rem', fontWeight: 700,
                color: accentColor,
              }}>
                ${product.price}
              </div>
              {product.originalPrice && (
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                    ${product.originalPrice}
                  </span>
                  {discount && (
                    <span style={{
                      fontSize: '0.6rem', fontWeight: 700,
                      background: 'rgba(0,229,197,0.12)', color: 'var(--neon)',
                      padding: '1px 6px',
                      clipPath: 'polygon(3px 0,100% 0,calc(100% - 3px) 100%,0 100%)',
                    }}>
                      -{discount}%
                    </span>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleAdd}
              style={{
                width: '34px', height: '34px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: added ? 'rgba(0,229,197,0.2)' : `rgba(${accentRgb},0.08)`,
                border: `1px solid rgba(${accentRgb},0.3)`,
                color: added ? 'var(--neon)' : accentColor,
                clipPath: 'polygon(5px 0,100% 0,calc(100% - 5px) 100%,0 100%)',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '1.1rem',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = isHot ? 'var(--magenta)' : 'var(--neon)'
                ;(e.currentTarget as HTMLElement).style.color = isHot ? '#fff' : '#000'
              }}
              onMouseLeave={e => {
                if (!added) {
                  (e.currentTarget as HTMLElement).style.background = `rgba(${accentRgb},0.08)`
                  ;(e.currentTarget as HTMLElement).style.color = accentColor
                }
              }}
            >
              {added
                ? <Check className="w-4 h-4" />
                : <ShoppingCart className="w-4 h-4" />
              }
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
