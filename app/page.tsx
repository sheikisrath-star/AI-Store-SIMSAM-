import Link from 'next/link'
import { PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import { ArrowRight, Zap, Shield, Globe, Star, TrendingUp, Users, Award, CheckCircle } from 'lucide-react'

export default function HomePage() {
  const featured = PRODUCTS.filter(p => p.badge === 'Best Seller')
  const hot = PRODUCTS.filter(p => p.badge === 'Hot' || p.badge === 'Premium')

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-900 pt-28 pb-32 px-4 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, #10b981 0%, transparent 50%), radial-gradient(circle at 80% 20%, #0d9488 0%, transparent 50%)' }} />

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Trusted by 5,000+ enterprise sustainability professionals worldwide
          </div>

          <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
            The #1 Marketplace for<br/>
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Green Tech & AI Solutions
            </span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Enterprise-grade ESG frameworks, carbon intelligence tools, and AI automation assets — built for global sustainability leaders. Instant delivery. Lifetime updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/products" className="group inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold px-8 py-4 rounded-2xl transition-all text-base shadow-lg shadow-emerald-500/25">
              Explore All Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/vendor" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-4 rounded-2xl transition-all text-base">
              Sell on VerdaSync AI <TrendingUp className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { value: '12+', label: 'Enterprise Solutions' },
              { value: '40+', label: 'Countries Served' },
              { value: '$597', label: 'Max Product Value' },
              { value: '100%', label: 'Digital Delivery' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-black text-emerald-400">{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="bg-white border-b border-slate-100 py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8">
          {[
            { icon: <Shield className="w-4 h-4" />, text: '30-day money back guarantee' },
            { icon: <Zap className="w-4 h-4" />, text: 'Instant digital delivery' },
            { icon: <Globe className="w-4 h-4" />, text: 'Used in 40+ countries' },
            { icon: <Star className="w-4 h-4" />, text: '4.9/5 from 2,000+ reviews' },
            { icon: <Award className="w-4 h-4" />, text: 'Enterprise-grade quality' },
          ].map(item => (
            <div key={item.text} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-emerald-500">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── Best Sellers ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">Top Picks</p>
            <h2 className="text-3xl font-black text-slate-900">Best Selling Solutions</h2>
          </div>
          <Link href="/products" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1">
            View all 12 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.slice(0, 3).map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ── Multi-vendor banner ── */}
      <section className="mx-4 sm:mx-6 lg:mx-auto max-w-7xl mb-20">
        <div className="rounded-3xl p-8 sm:p-12 grid md:grid-cols-2 gap-8 items-center" style={{background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 50%, #134e4a 100%)'}}>
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              Vendor Marketplace
            </div>
            <h2 className="text-3xl font-black mb-4">Sell Your Green Tech & AI Products Here</h2>
            <p className="text-slate-300 mb-6 leading-relaxed">Are you a sustainability consultant, AI specialist, or green tech creator? List your digital products on VerdaSync AI and reach enterprise buyers in 40+ countries. Keep 80–85% of every sale.</p>
            <div className="space-y-3 mb-8">
              {[
                '0% commission for your first 3 months',
                'Instant payouts via PayHere or Payoneer',
                'Reach Fortune 500 sustainability teams',
                'Free listing review & quality certification',
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-emerald-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  {f}
                </div>
              ))}
            </div>
            <Link href="/vendor" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Apply as a Vendor <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '💰', label: 'Avg. vendor monthly earnings', value: '$2,400+' },
              { icon: '🌍', label: 'Active buyer countries', value: '40+' },
              { icon: '📦', label: 'Products listed', value: '12+' },
              { icon: '⚡', label: 'Setup time', value: '< 24hrs' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-4 text-white text-center">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-xl font-black text-emerald-300">{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-slate-50 py-20 px-4 border-y border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-3">Simple Process</p>
          <h2 className="text-3xl font-black text-slate-900 mb-4">How VerdaSync AI Works</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-12">From ESG challenge to enterprise solution in minutes — not months.</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: '🎯', title: 'Choose Framework', desc: 'Browse 12 enterprise categories and select the solution for your sustainability challenge' },
              { icon: '💳', title: 'Secure Checkout', desc: 'Pay securely via PayHere, card, or bank transfer. Accepted in 100+ currencies worldwide' },
              { icon: '⚡', title: 'Instant Download', desc: 'Receive your complete framework, templates, and AI toolkits immediately after payment' },
              { icon: '📈', title: 'Deploy & Measure', desc: 'Implement proven methodologies and track your ESG improvement outcomes' },
            ].map(item => (
              <div key={item.title} className="text-center">
                <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-sm">{item.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Hot products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold text-rose-600 uppercase tracking-widest mb-2">🔥 Trending Now</p>
            <h2 className="text-3xl font-black text-slate-900">Hot This Month</h2>
          </div>
          <Link href="/products" className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm flex items-center gap-1">
            See all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hot.slice(0, 3).map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="bg-white py-16 px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">Browse by Domain</p>
            <h2 className="text-3xl font-black text-slate-900">12 Enterprise Intelligence Domains</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Green AI Core', emoji: '🌿' },
              { name: 'Sustainable Capital', emoji: '💹' },
              { name: 'Eco-Design', emoji: '🎨' },
              { name: 'Supply Chain', emoji: '🔗' },
              { name: 'ESG Reporting', emoji: '📊' },
              { name: 'Green Media', emoji: '🎬' },
              { name: 'Eco-Commerce', emoji: '🌍' },
              { name: 'Operations', emoji: '⚙️' },
              { name: 'Green Marketing', emoji: '📡' },
              { name: 'Green Web3', emoji: '🔐' },
              { name: 'Green HR', emoji: '🌱' },
              { name: 'CleanTech Startup', emoji: '🚀' },
            ].map(cat => (
              <Link key={cat.name} href="/products" className="bg-slate-50 border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2">
                <span>{cat.emoji}</span> {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── All Products ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-900 mb-3">All Enterprise Solutions</h2>
          <p className="text-slate-500">Every product includes lifetime updates, global compliance coverage, and a 30-day guarantee</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      {/* ── Social proof ── */}
      <section className="bg-slate-50 py-16 px-4 border-t border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-3">Trusted Worldwide</p>
          <h2 className="text-2xl font-black text-slate-900 mb-10">What Enterprise Teams Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { quote: 'VerdaReport cut our CDP submission time from 6 weeks to 4 days. Exceptional framework.', name: 'Head of ESG, European Investment Fund', rating: 5 },
              { quote: 'VerdaChain gave us complete Scope 3 visibility across 400 suppliers. Worth every dollar.', name: 'Sustainability Director, Global Logistics Co.', rating: 5 },
              { quote: 'VerdaPrompt transformed how our team uses AI for sustainability storytelling. Incredible ROI.', name: 'Chief Sustainability Officer, Tech Enterprise', rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm text-left">
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-xs font-semibold text-slate-500">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto rounded-3xl p-12 text-center text-white" style={{background: 'linear-gradient(135deg, #065f46, #0f766e, #0369a1)'}}>
          <div className="text-5xl mb-5">🌿</div>
          <h2 className="text-3xl font-black mb-4">Ready to Lead the Green Transition?</h2>
          <p className="text-emerald-100 mb-8 max-w-lg mx-auto">Join 5,000+ enterprise professionals using VerdaSync AI to hit net-zero targets, automate ESG compliance, and unlock sustainable revenue streams.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products" className="bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-colors">
              Browse All Solutions →
            </Link>
            <Link href="/vendor" className="bg-emerald-500/20 border border-emerald-400/30 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-emerald-500/30 transition-colors">
              Become a Vendor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
