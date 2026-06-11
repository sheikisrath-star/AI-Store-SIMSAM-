import Link from 'next/link'
import { PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import { ArrowRight, Zap, Shield, Globe, Star } from 'lucide-react'

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 3)

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-atlas-900 pt-28 pb-24 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-atlas-500/20 border border-atlas-500/30 text-atlas-300 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-atlas-400 rounded-full animate-pulse" />
            5 AI Agents Running — Products updated daily
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 leading-tight">
            Digital Products<br/>
            <span className="text-atlas-400">Built by AI.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-xl mx-auto mb-10">
            Every product created, optimised, and marketed by autonomous AI agents. Premium quality. Fair prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 justify-center">
              Shop All Products <ArrowRight className="w-4 h-4" />
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
            { icon: <Shield className="w-4 h-4" />, text: '30-day money back' },
            { icon: <Zap className="w-4 h-4" />, text: 'Instant delivery' },
            { icon: <Globe className="w-4 h-4" />, text: 'Works worldwide' },
            { icon: <Star className="w-4 h-4" />, text: '2,000+ happy customers' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-slate-600">
              <span className="text-atlas-500">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-atlas-600 uppercase tracking-widest mb-2">Featured</p>
            <h2 className="text-3xl font-black text-slate-900">Best Sellers</h2>
          </div>
          <Link href="/products" className="text-atlas-600 hover:text-atlas-700 font-semibold text-sm flex items-center gap-1">
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
          <p className="text-xs font-semibold text-atlas-600 uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl font-black text-slate-900 mb-12">AI builds it. You profit.</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', icon: '🧠', title: 'CEO Agent', desc: 'Identifies market opportunities and decides product direction' },
              { step: '2', icon: '🛒', title: 'Product Agent', desc: 'Creates compelling product listings with perfect copy and pricing' },
              { step: '3', icon: '📣', title: 'Marketing Agent', desc: 'Generates SEO content, TikTok scripts, and email campaigns' },
              { step: '4', icon: '📊', title: 'Analytics Agent', desc: 'Tracks performance and optimises for maximum revenue' },
            ].map(item => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-atlas-50 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-3">All Products</h2>
          <p className="text-slate-500">Every product comes with lifetime updates and a 30-day guarantee</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-4 pb-20">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-atlas-600 to-blue-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-black mb-4">Run the AI Command Center</h2>
          <p className="text-atlas-100 mb-8 max-w-lg mx-auto">Watch live AI agents generate products, write marketing, and optimize your business in real time.</p>
          <Link href="/dashboard" className="bg-white text-atlas-700 font-bold px-8 py-3 rounded-xl hover:bg-atlas-50 transition-colors inline-block">
            Open Dashboard →
          </Link>
        </div>
      </section>
    </div>
  )
}
