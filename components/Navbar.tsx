'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const { totalItems, toggleCart } = useCartStore()
  const count = totalItems()
  const [query, setQuery] = useState('')

  return (
    <nav
      className="fixed top-0 inset-x-0 z-40"
      style={{
        background: 'rgba(6,6,14,0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(0,229,197,0.18)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-5">

        {/* Logo */}
        <Link
          href="/"
          className="font-display font-black text-lg tracking-widest flex-shrink-0 text-neon-glow"
          style={{
            fontFamily: 'Orbitron, system-ui',
            color: 'var(--neon)',
            textShadow: '0 0 20px rgba(0,229,197,0.5)',
            letterSpacing: '0.12em',
            textDecoration: 'none',
          }}
        >
          VERDA<span style={{ color: 'var(--magenta)' }}>SYNC</span>
        </Link>

        {/* Angled search panel */}
        <div className="hidden sm:flex flex-1 max-w-md" style={{ transform: 'skewX(-4deg)' }}>
          <div
            className="relative flex items-center w-full"
            style={{
              background: 'rgba(0,229,197,0.05)',
              border: '1px solid rgba(0,229,197,0.25)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {/* Left glow bar */}
            <span
              style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
                background: 'var(--neon)',
                boxShadow: '0 0 10px var(--neon)',
              }}
            />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search AI & green tech solutions..."
              className="flex-1 bg-transparent border-none outline-none text-sm pl-4 pr-2 py-2.5"
              style={{
                transform: 'skewX(4deg)',
                color: 'var(--text)',
                fontFamily: 'Inter, sans-serif',
              }}
            />
            <button
              className="font-bold text-xs px-4 py-2.5 tracking-widest"
              style={{
                transform: 'skewX(4deg)',
                background: 'var(--neon)',
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.1em',
              }}
            >
              SEARCH
            </button>
          </div>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-widest uppercase ml-auto">
          {[
            { href: '/products',  label: 'Products' },
            { href: '/vendor',    label: 'Sell Here' },
            { href: '/dashboard', label: 'Dashboard' },
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors"
              style={{ color: 'var(--text-dim)', textDecoration: 'none', letterSpacing: '0.08em' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Cart */}
        <button
          onClick={toggleCart}
          className="relative flex items-center gap-2 font-bold text-xs tracking-widest uppercase transition-all ml-3"
          style={{
            background: 'rgba(0,229,197,0.08)',
            border: '1px solid rgba(0,229,197,0.25)',
            color: 'var(--neon)',
            padding: '0.45rem 1rem',
            clipPath: 'polygon(8px 0,100% 0,calc(100% - 8px) 100%,0 100%)',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">CART</span>
          {count > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 text-white text-[10px] font-black rounded-full flex items-center justify-center"
              style={{ background: 'var(--magenta)', boxShadow: '0 0 8px var(--magenta)' }}
            >
              {count}
            </span>
          )}
        </button>

        {/* Shop Now CTA (desktop) */}
        <Link
          href="/products"
          className="hidden lg:flex btn-geo text-xs"
          style={{ padding: '0.45rem 1.2rem' }}
        >
          SHOP NOW
        </Link>
      </div>
    </nav>
  )
}
