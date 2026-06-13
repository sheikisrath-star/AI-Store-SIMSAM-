import Link from 'next/link'
import { PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import DataStream from '@/components/DataStream'
import { ArrowRight, Shield, Globe, Star, TrendingUp, CheckCircle, Zap, Award } from 'lucide-react'

export default function HomePage() {
  const featured = PRODUCTS.filter(p => p.badge === 'Best Seller')
  const hot      = PRODUCTS.filter(p => p.badge === 'Hot' || p.badge === 'Premium')

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <DataStream />

      {/* ══ SPLIT HERO ══ */}
      <section
        className="relative grid md:grid-cols-2 overflow-hidden"
        style={{ marginTop: '68px', minHeight: '520px' }}
      >
        {/* Left panel */}
        <div
          className="relative flex flex-col justify-center px-8 sm:px-14 py-16"
          style={{
            background: 'linear-gradient(135deg,#060614 0%,#0d0d22 60%,#080818 100%)',
            zIndex: 1,
          }}
        >
          {/* Diagonal edge glow */}
          <div style={{
            position:'absolute',top:0,right:'-24px',bottom:0,
            width:'48px',
            background:'linear-gradient(to bottom,transparent,rgba(0,229,197,0.12),rgba(0,229,197,0.2),rgba(0,229,197,0.12),transparent)',
            transform:'skewX(-6deg)',
            zIndex:5,
          }} />

          <div className="eyebrow">Enterprise Solutions Platform</div>
          <h1
            className="font-black leading-tight mb-5"
            style={{ fontFamily:'Orbitron,system-ui', fontSize:'clamp(1.8rem,4vw,3rem)' }}
          >
            THE #1 GREEN<br />
            <span className="text-neon-glow">TECH & AI</span><br />
            MARKETPLACE
          </h1>
          <p className="text-sm mb-8 max-w-md leading-relaxed" style={{ color:'var(--text-dim)' }}>
            Enterprise-grade ESG frameworks, carbon intelligence tools, and AI automation
            assets — built for global sustainability leaders. Instant delivery, lifetime updates.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn-geo">
              Explore Solutions <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/vendor" className="btn-geo-outline">
              Sell Here <TrendingUp className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex gap-8 mt-10">
            {[
              { value: '12+', label: 'Solutions' },
              { value: '40+', label: 'Countries' },
              { value: '5K+', label: 'Professionals' },
            ].map(s => (
              <div key={s.label}>
                <div
                  style={{ fontFamily:'Orbitron,system-ui', fontSize:'1.4rem', fontWeight:900, color:'var(--neon)', textShadow:'0 0 15px rgba(0,229,197,0.4)' }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:'2px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Neon vertical divider */}
        <div className="neon-divider hidden md:block" />

        {/* Right panel */}
        <div
          className="relative flex flex-col justify-center px-8 sm:px-14 py-16"
          style={{
            background: 'linear-gradient(135deg,#060e0c 0%,#0a1a14 60%,#060c0a 100%)',
            zIndex: 1,
          }}
        >
          <div className="eyebrow" style={{ '--neon':'#ff0077' } as React.CSSProperties}>
            <span style={{ background:'var(--magenta)', boxShadow:'0 0 8px var(--magenta)' }} />
            <span style={{ color:'var(--magenta)', marginLeft:'-16px' }}>New This Week</span>
          </div>
          <h1
            className="font-black leading-tight mb-5"
            style={{ fontFamily:'Orbitron,system-ui', fontSize:'clamp(1.8rem,4vw,3rem)' }}
          >
            NEW AI<br />
            <span className="text-mag-glow">DROPS &</span><br />
            TRENDING
          </h1>
          <p className="text-sm mb-8 max-w-md leading-relaxed" style={{ color:'var(--text-dim)' }}>
            Freshly certified frameworks, next-gen ESG reporting kits, and AI prompt
            libraries updated for 2025 regulatory requirements.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products" className="btn-geo-mag">
              New Arrivals <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/products" className="btn-geo-outline">
              View Deals
            </Link>
          </div>

          {/* Price highlight */}
          <div className="mt-10 flex items-center gap-4">
            <div>
              <div style={{ fontSize:'0.65rem', letterSpacing:'0.15em', color:'var(--text-muted)', textTransform:'uppercase', marginBottom:'4px' }}>Starting from</div>
              <div style={{ fontFamily:'Orbitron,system-ui', fontSize:'2rem', fontWeight:900, color:'var(--magenta)', textShadow:'0 0 20px rgba(255,0,119,0.4)' }}>
                $49
              </div>
            </div>
            <div style={{ fontSize:'0.72rem', color:'var(--text-muted)', maxWidth:'120px', lineHeight:1.5 }}>
              100% digital. Instant access after checkout.
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS BAR ══ */}
      <div
        style={{
          position:'relative', zIndex:1,
          background:'rgba(0,229,197,0.03)',
          borderTop:'1px solid rgba(0,229,197,0.12)',
          borderBottom:'1px solid rgba(0,229,197,0.12)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: <Shield className="w-4 h-4" />,  text: '30-day money-back guarantee' },
            { icon: <Zap className="w-4 h-4" />,     text: 'Instant digital delivery' },
            { icon: <Globe className="w-4 h-4" />,   text: 'Used in 40+ countries' },
            { icon: <Star className="w-4 h-4" />,    text: '4.9/5 from 2,000+ reviews' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-xs" style={{ color:'var(--text-dim)' }}>
              <span style={{ color:'var(--neon)' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* ══ BEST SELLERS ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16" style={{ position:'relative', zIndex:1 }}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="eyebrow">Top Picks</div>
            <h2 style={{ fontFamily:'Orbitron,system-ui', fontSize:'1.4rem', fontWeight:700, color:'var(--text)' }}>
              BEST SELLING SOLUTIONS
            </h2>
          </div>
          <Link href="/products" className="see-all">View all 12</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featured.slice(0, 3).map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ══ TRENDING STRIP ══ */}
      <div
        style={{
          position:'relative', zIndex:1,
          borderTop:'1px solid rgba(0,229,197,0.12)',
          borderBottom:'1px solid rgba(0,229,197,0.12)',
          padding:'1.5rem 0',
          background:'rgba(0,229,197,0.02)',
          overflow:'hidden',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-3">
          <div className="eyebrow">Trending Now</div>
        </div>
        <div
          className="flex gap-3 overflow-x-auto px-4 sm:px-6"
          style={{ maxWidth:'1280px', margin:'0 auto', scrollbarWidth:'none' }}
        >
          {PRODUCTS.slice(0, 8).map((p, i) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="flex-shrink-0 flex items-center gap-3 transition-all"
              style={{
                width:'230px',
                background:'var(--card-bg)',
                border:'1px solid rgba(0,229,197,0.18)',
                borderRadius:'2px',
                padding:'0.85rem',
                textDecoration:'none',
                position:'relative',
              }}
            >
              <div
                style={{
                  width:'40px', height:'40px', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:'1.4rem',
                  background:'rgba(0,229,197,0.05)',
                  border:'1px solid rgba(0,229,197,0.15)',
                }}
              >
                {p.emoji}
              </div>
              <div>
                <div style={{ fontSize:'0.75rem', fontWeight:600, color:'var(--text)', lineHeight:1.3, marginBottom:'2px' }}>
                  {p.name.split(' ').slice(0,3).join(' ')}
                </div>
                <div style={{ fontFamily:'Orbitron,system-ui', fontSize:'0.8rem', fontWeight:700, color:'var(--neon)' }}>
                  ${p.price}
                </div>
              </div>
              <div
                style={{
                  position:'absolute', top:'6px', right:'8px',
                  fontFamily:'Orbitron,system-ui', fontSize:'0.5rem',
                  color:'var(--text-muted)', letterSpacing:'0.1em',
                }}
              >
                #{i + 1}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══ VENDOR BANNER ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14" style={{ position:'relative', zIndex:1 }}>
        <div
          className="grid md:grid-cols-2 gap-8 items-center p-8 sm:p-12"
          style={{
            background:'linear-gradient(135deg,#06060e 0%,#0c0c18 40%,#060e0c 100%)',
            border:'1px solid rgba(0,229,197,0.2)',
            borderRadius:'2px',
            position:'relative',
            overflow:'hidden',
          }}
        >
          {/* Glow accent */}
          <div style={{
            position:'absolute', top:'50%', left:'50%',
            transform:'translate(-50%,-50%)',
            width:'500px', height:'250px',
            background:'radial-gradient(ellipse,rgba(0,229,197,0.06) 0%,transparent 70%)',
            pointerEvents:'none',
          }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <div className="eyebrow">Vendor Marketplace</div>
            <h2
              style={{ fontFamily:'Orbitron,system-ui', fontSize:'1.5rem', fontWeight:700, color:'var(--text)', marginBottom:'1rem', lineHeight:1.2 }}
            >
              SELL YOUR GREEN TECH &amp; AI PRODUCTS
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color:'var(--text-dim)', maxWidth:'400px' }}>
              Reach enterprise buyers in 40+ countries. Keep 80–85% of every sale. Zero commission for your first 3 months.
            </p>
            <div className="space-y-2 mb-6">
              {[
                '0% commission for your first 3 months',
                'Instant payouts via PayHere',
                'Reach Fortune 500 sustainability teams',
                'Free listing review &amp; quality certification',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm" style={{ color:'rgba(0,229,197,0.8)' }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color:'var(--neon)' }} />
                  <span dangerouslySetInnerHTML={{ __html: f }} />
                </div>
              ))}
            </div>
            <Link href="/vendor" className="btn-geo">
              Apply as Vendor <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4" style={{ position:'relative', zIndex:1 }}>
            {[
              { icon:'💰', label:'Avg. monthly earnings', value:'$2,400+' },
              { icon:'🌍', label:'Active buyer countries', value:'40+' },
              { icon:'📦', label:'Products listed', value:'12+' },
              { icon:'⚡', label:'Setup time', value:'< 24hrs' },
            ].map(s => (
              <div
                key={s.label}
                className="text-center p-4"
                style={{
                  background:'rgba(0,229,197,0.04)',
                  border:'1px solid rgba(0,229,197,0.15)',
                  borderRadius:'2px',
                }}
              >
                <div style={{ fontSize:'1.6rem', marginBottom:'6px' }}>{s.icon}</div>
                <div style={{ fontFamily:'Orbitron,system-ui', fontSize:'1.1rem', fontWeight:900, color:'var(--neon)' }}>{s.value}</div>
                <div style={{ fontSize:'0.65rem', color:'var(--text-muted)', marginTop:'2px', letterSpacing:'0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section
        style={{
          position:'relative', zIndex:1,
          borderTop:'1px solid rgba(0,229,197,0.1)',
          borderBottom:'1px solid rgba(0,229,197,0.1)',
          background:'rgba(0,229,197,0.015)',
          padding:'4rem 1rem',
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="eyebrow justify-center" style={{ justifyContent:'center' }}>Simple Process</div>
          <h2
            style={{ fontFamily:'Orbitron,system-ui', fontSize:'1.4rem', fontWeight:700, color:'var(--text)', marginBottom:'0.5rem' }}
          >
            HOW VERDASYNC AI WORKS
          </h2>
          <p className="text-sm mb-10" style={{ color:'var(--text-dim)' }}>From ESG challenge to enterprise solution in minutes — not months.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon:'🎯', step:'01', title:'Choose Framework', desc:'Browse 12 enterprise categories and select your solution' },
              { icon:'💳', step:'02', title:'Secure Checkout',  desc:'Pay securely via PayHere — accepted worldwide' },
              { icon:'⚡', step:'03', title:'Instant Download', desc:'Receive complete frameworks, templates & AI toolkits immediately' },
              { icon:'📈', step:'04', title:'Deploy & Measure', desc:'Implement proven methodologies and track ESG outcomes' },
            ].map(item => (
              <div key={item.title} className="text-center">
                <div
                  style={{
                    width:'56px', height:'56px',
                    background:'rgba(0,229,197,0.06)',
                    border:'1px solid rgba(0,229,197,0.2)',
                    borderRadius:'2px',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.6rem',
                    margin:'0 auto 12px',
                  }}
                >
                  {item.icon}
                </div>
                <div style={{ fontFamily:'Orbitron,system-ui', fontSize:'0.55rem', letterSpacing:'0.2em', color:'var(--neon)', marginBottom:'4px' }}>
                  STEP {item.step}
                </div>
                <h3 style={{ fontSize:'0.88rem', fontWeight:700, color:'var(--text)', marginBottom:'6px' }}>{item.title}</h3>
                <p style={{ fontSize:'0.72rem', color:'var(--text-dim)', lineHeight:1.55 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOT PRODUCTS ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16" style={{ position:'relative', zIndex:1 }}>
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="eyebrow" style={{ color:'var(--magenta)' }}>
              <span style={{ background:'var(--magenta)', width:'20px', height:'1px', display:'inline-block', boxShadow:'0 0 8px var(--magenta)' }} />
              Trending Now
            </div>
            <h2 style={{ fontFamily:'Orbitron,system-ui', fontSize:'1.4rem', fontWeight:700, color:'var(--text)' }}>
              HOT THIS MONTH
            </h2>
          </div>
          <Link href="/products" className="see-all" style={{ borderColor:'rgba(255,0,119,0.3)', color:'var(--magenta)' }}>
            See all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {hot.slice(0, 3).map(product => <ProductCard key={product.id} product={product} hot />)}
        </div>
      </section>

      {/* ══ CATEGORIES ══ */}
      <section
        style={{
          position:'relative', zIndex:1,
          borderTop:'1px solid rgba(0,229,197,0.1)',
          padding:'3rem 1rem',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="eyebrow justify-center" style={{ justifyContent:'center' }}>Browse by Domain</div>
            <h2 style={{ fontFamily:'Orbitron,system-ui', fontSize:'1.3rem', fontWeight:700, color:'var(--text)' }}>
              12 ENTERPRISE INTELLIGENCE DOMAINS
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name:'Green AI Core',       emoji:'🌿' },
              { name:'Sustainable Capital', emoji:'💹' },
              { name:'Eco-Design',          emoji:'🎨' },
              { name:'Supply Chain',        emoji:'🔗' },
              { name:'ESG Reporting',       emoji:'📊' },
              { name:'Green Media',         emoji:'🎬' },
              { name:'Eco-Commerce',        emoji:'🌍' },
              { name:'Operations',          emoji:'⚙️' },
              { name:'Green Marketing',     emoji:'📡' },
              { name:'Green Web3',          emoji:'🔐' },
              { name:'Green HR',            emoji:'🌱' },
              { name:'CleanTech Startup',   emoji:'🚀' },
            ].map(cat => (
              <Link
                key={cat.name}
                href="/products"
                className="flex items-center gap-2 text-xs font-medium tracking-wider transition-all"
                style={{
                  background:'rgba(0,229,197,0.04)',
                  border:'1px solid rgba(0,229,197,0.18)',
                  color:'var(--text-dim)',
                  padding:'0.45rem 1rem',
                  clipPath:'polygon(6px 0,100% 0,calc(100% - 6px) 100%,0 100%)',
                  textDecoration:'none',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--neon)'; (e.currentTarget as HTMLElement).style.color = 'var(--neon)'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,229,197,0.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,229,197,0.18)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,229,197,0.04)' }}
              >
                <span>{cat.emoji}</span> {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ALL PRODUCTS ══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16" style={{ position:'relative', zIndex:1 }}>
        <div className="text-center mb-10">
          <div className="eyebrow justify-center" style={{ justifyContent:'center' }}>Full Catalogue</div>
          <h2 style={{ fontFamily:'Orbitron,system-ui', fontSize:'1.4rem', fontWeight:700, color:'var(--text)', marginBottom:'0.5rem' }}>
            ALL ENTERPRISE SOLUTIONS
          </h2>
          <p style={{ fontSize:'0.82rem', color:'var(--text-dim)' }}>
            Every product includes lifetime updates, global compliance coverage, and a 30-day guarantee
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section
        style={{
          position:'relative', zIndex:1,
          borderTop:'1px solid rgba(0,229,197,0.1)',
          background:'rgba(0,229,197,0.015)',
          padding:'4rem 1rem',
        }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="eyebrow justify-center" style={{ justifyContent:'center' }}>Trusted Worldwide</div>
          <h2 style={{ fontFamily:'Orbitron,system-ui', fontSize:'1.3rem', fontWeight:700, color:'var(--text)', marginBottom:'2.5rem' }}>
            WHAT ENTERPRISE TEAMS SAY
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { quote: 'VerdaReport cut our CDP submission time from 6 weeks to 4 days. Exceptional framework.', name: 'Head of ESG, European Investment Fund', rating: 5 },
              { quote: 'VerdaChain gave us complete Scope 3 visibility across 400 suppliers. Worth every dollar.', name: 'Sustainability Director, Global Logistics Co.', rating: 5 },
              { quote: 'VerdaPrompt transformed how our team uses AI for sustainability storytelling. Incredible ROI.', name: 'Chief Sustainability Officer, Tech Enterprise', rating: 5 },
            ].map((t, i) => (
              <div
                key={i}
                className="text-left p-5"
                style={{
                  background:'var(--card-bg)',
                  border:'1px solid rgba(0,229,197,0.18)',
                  borderRadius:'2px',
                  position:'relative',
                }}
              >
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'1px', background:'linear-gradient(to right,transparent,var(--neon),transparent)', opacity:0.4 }} />
                <div className="flex mb-3" style={{ color:'#ffaa00' }}>
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-current" />)}
                </div>
                <p className="text-sm leading-relaxed mb-4 italic" style={{ color:'var(--text-dim)' }}>&ldquo;{t.quote}&rdquo;</p>
                <p style={{ fontSize:'0.7rem', fontWeight:600, color:'var(--text-muted)', letterSpacing:'0.08em' }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="px-4 py-16" style={{ position:'relative', zIndex:1 }}>
        <div
          className="max-w-3xl mx-auto text-center p-10 sm:p-14"
          style={{
            background:'linear-gradient(135deg,#06060e,#0c0c18,#060e0c)',
            border:'1px solid rgba(0,229,197,0.25)',
            borderRadius:'2px',
            position:'relative',
            overflow:'hidden',
          }}
        >
          <div style={{
            position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)',
            width:'400px', height:'200px',
            background:'radial-gradient(ellipse,rgba(0,229,197,0.07) 0%,transparent 70%)',
            pointerEvents:'none',
          }} />
          <div style={{ position:'relative', zIndex:1 }}>
            <div className="eyebrow justify-center" style={{ justifyContent:'center', marginBottom:'1rem' }}>Ready to Lead</div>
            <h2
              style={{ fontFamily:'Orbitron,system-ui', fontSize:'1.6rem', fontWeight:900, color:'var(--text)', marginBottom:'1rem', lineHeight:1.15 }}
            >
              LEAD THE<br /><span className="text-neon-glow">GREEN TRANSITION</span>
            </h2>
            <p className="text-sm mb-8 max-w-md mx-auto leading-relaxed" style={{ color:'var(--text-dim)' }}>
              Join 5,000+ enterprise professionals using VerdaSync AI to hit net-zero targets, automate ESG compliance, and unlock sustainable revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products" className="btn-geo">
                Browse All Solutions
              </Link>
              <Link href="/vendor" className="btn-geo-outline">
                Become a Vendor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
