import Link from 'next/link'
import { PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import { ArrowRight, Zap, Shield, Globe, Star } from 'lucide-react'

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 3)

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 pt-28 pb-24 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            12 Enterprise Solutions · Serving 40+ Countries
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            Green Tech & AI<br/>
            <span className="text-emerald-400">Enterprise Intelligence.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            The world&apos;s leading B2B platform for ESG compliance, carbon intelligence, and sustainability-driven AI frameworks. Trusted by enterprise teams globally.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 justify-center" style={{background: 'linear-gradient(135deg, #059669, #0d9488)'}}>
              Explore Solutions <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-base">
              AI Command Center
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-white border-y border-slate-100 py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-sm text-slate-500">
          {[
            { icon: <Shield className="w-4 h-4" />, text: '30-day money back guarantee' },
            { icon: <Zap className="w-4 h-4" />, text: 'Instant digital delivery' },
            { icon: <Globe className="w-4 h-4" />, text: 'Enterprise clients worldwide' },
            { icon: <Star className="w-4 h-4" />, text: '5,000+ sustainability professionals' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-slate-600">
              <span className="text-emerald-500">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">Featured Solutions</p>
            <h2 className="text-3xl font-black text-slate-900">Most Popular This Quarter</h2>
          </div>
          <Link href="/products" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white py-20 px-4 border-y border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-3">How VerdaSync AI Works</p>
          <h2 className="text-3xl font-black text-slate-900 mb-4">From ESG Challenge to Enterprise Solution</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-12">Our enterprise intelligence frameworks are built on analysis of 10,000+ corporate sustainability reports, regulatory filings, and green technology deployments worldwide.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: '🎯', title: 'Select Framework', desc: 'Choose the enterprise solution matching your sustainability challenge or compliance requirement' },
              { step: '2', icon: '⚡', title: 'Instant Access', desc: 'Receive your complete framework, templates, and AI toolkits immediately upon purchase' },
              { step: '3', icon: '🏗️', title: 'Deploy & Execute', desc: 'Implement proven methodologies adapted for your industry, jurisdiction, and org size' },
              { step: '4', icon: '📈', title: 'Measure Impact', desc: 'Track carbon reduction, ESG score improvement, and regulatory compliance outcomes' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">Solution Categories</p>
          <h2 className="text-3xl font-black text-slate-900 mb-3">12 Enterprise Intelligence Domains</h2>
          <p className="text-slate-500">Comprehensive coverage of every green technology and ESG challenge facing modern enterprises</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {['Green AI Core', 'Sustainable Capital', 'Eco-D