import Link from 'next/link'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#030308',
        borderTop: '1px solid rgba(0,229,197,0.15)',
        padding: '2.5rem 1rem 1.5rem',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="grid sm:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'Orbitron, system-ui',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  color: 'var(--neon)',
                  textShadow: '0 0 15px rgba(0,229,197,0.4)',
                  letterSpacing: '0.1em',
                }}
              >
                VERDA<span style={{ color: 'var(--magenta)' }}>SYNC</span> AI
              </span>
            </Link>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
              Enterprise Green Tech &amp; AI SaaS intelligence platform. Empowering organisations worldwide to achieve net-zero through cutting-edge sustainability frameworks.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <p
              style={{
                fontFamily: 'Orbitron, system-ui',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                color: 'var(--neon)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Solutions
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/products',  label: 'All Products' },
                { href: '/cart',      label: 'Cart' },
                { href: '/checkout',  label: 'Checkout' },
                { href: '/vendor',    label: 'Sell on VerdaSync' },
              ].map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Platform */}
          <div>
            <p
              style={{
                fontFamily: 'Orbitron, system-ui',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                color: 'var(--neon)',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              Platform
            </p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { href: '/dashboard', label: 'AI Command Center' },
              ].map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--neon)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(0,229,197,0.08)',
            paddingTop: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          className="sm:flex-row"
        >
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()}{' '}
            <span style={{ color: 'var(--neon)' }}>VerdaSync AI</span>
            {'. '}All rights reserved. Worldwide B2B Green Tech &amp; AI Solutions.
          </p>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            🌿 Building a sustainable future through technology
          </p>
        </div>
      </div>
    </footer>
  )
}
