'use client'

import { useState } from 'react'
import { CheckCircle, ArrowRight, TrendingUp, Globe, Zap, Shield, Star, Users } from 'lucide-react'

export default function VendorPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', business: '', website: '', description: '', category: '' })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-900 pt-28 pb-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <TrendingUp className="w-4 h-4" /> Vendor Marketplace — Now Open
          </div>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">
            Sell Your Green Tech &<br/>
            <span className="text-emerald-400">AI Products Globally</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            List your sustainability frameworks, AI toolkits, and ESG solutions on VerdaSync AI. Reach enterprise buyers in 40+ countries. Keep up to 85% of every sale.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { value: '85%', label: 'Your revenue share' },
              { value: '40+', label: 'Countries reached' },
              { value: '0%', label: 'Commission — first 3 months' },
              { value: '24hr', label: 'Listing approval' },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-2xl p-4 text-center">
                <div className="text-2xl font-black text-emerald-400">{s.value}</div>
                <div className="text-xs text-slate-400 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">Why Sell Here</p>
          <h2 className="text-3xl font-black text-slate-900">Everything You Need to Succeed</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Globe className="w-6 h-6" />,
              title: 'Global Buyer Network',
              desc: 'Your products are instantly visible to enterprise ESG teams, sustainability consultants, and procurement professionals across 40+ countries.',
            },
            {
              icon: <Zap className="w-6 h-6" />,
              title: 'Instant Payouts',
              desc: 'Receive your earnings automatically via PayHere (Sri Lanka), Payoneer, or Wise. No waiting — money hits your account within 24–48 hours.',
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: 'Quality Certification',
              desc: 'Every listed product receives a VerdaSync AI Quality Badge after our review, instantly boosting buyer trust and conversion rates.',
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              title: '85% Revenue Share',
              desc: 'Keep 85% of every sale you make. VerdaSync AI takes only a 15% platform fee to cover infrastructure, marketing, and payment processing.',
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: 'Marketing Support',
              desc: 'Your products get featured in our LinkedIn campaigns, email newsletters, and SEO content reaching 50,000+ sustainability professionals monthly.',
            },
            {
              icon: <Star className="w-6 h-6" />,
              title: '0% Fee — First 3 Months',
              desc: 'New vendors pay zero commission for the first 3 months. List your products, make sales, and build your reputation at no cost.',
            },
          ].map(b => (
            <div key={b.title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                {b.icon}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What products qualify */}
      <section className="bg-slate-50 py-16 px-4 border-y border-slate-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">Product Criteria</p>
            <h2 className="text-3xl font-black text-slate-900">What Can You Sell?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'ESG reporting templates & frameworks (TCFD, GRI, CSRD, CDP)',
              'Carbon accounting tools & Scope 1/2/3 calculators',
              'AI prompt engineering packs for sustainability',
              'Supply chain decarbonization methodologies',
              'Green marketing & content strategy systems',
              'Sustainable procurement & vendor audit templates',
              'Climate tech startup playbooks & pitch decks',
              'Green HR, DEI & workforce sustainability guides',
              'Web3 / carbon credit tokenization frameworks',
              'Renewable energy project planning tools',
              'Circular economy transformation blueprints',
              'Any professional digital product in the green/AI space',
            ].map(item => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">Process</p>
          <h2 className="text-3xl font-black text-slate-900">How to Start Selling in 4 Steps</h2>
        </div>
        <div className="space-y-6">
          {[
            { step: '01', title: 'Submit Your Application', desc: 'Fill out the vendor application below. Tell us about yourself, your expertise, and the type of products you want to list.' },
            { step: '02', title: 'Product Review & Approval', desc: 'Our team reviews your application within 24 hours. We assess product quality, market fit, and alignment with our green tech focus.' },
            { step: '03', title: 'Get Your Vendor Dashboard', desc: 'Once approved, you receive login access to your vendor dashboard where you can upload products, set prices, and track sales.' },
            { step: '04', title: 'Sell & Get Paid', desc: 'When customers buy your products, earnings are automatically calculated. Payouts processed weekly via your chosen payment method.' },
          ].map(s => (
            <div key={s.step} className="flex gap-6 items-start">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                {s.step}
              </div>
              <div className="pt-2">
                <h3 className="font-bold text-slate-900 mb-1">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section className="bg-white py-16 px-4 border-t border-slate-100" id="apply">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">Apply Now</p>
            <h2 className="text-3xl font-black text-slate-900 mb-3">Join the VerdaSync AI Marketplace</h2>
            <p className="text-slate-500">Complete the form below — our team reviews all applications within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Application Received!</h3>
              <p className="text-slate-500 max-w-md mx-auto">Thank you for applying. Our team will review your application and get back to you within 24 hours at the email address you provided.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
                  <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address *</label>
                  <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="you@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Business / Brand Name *</label>
                  <input required type="text" value={form.business} onChange={e => setForm({...form, business: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Your business name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Website / LinkedIn (optional)</label>
                  <input type="url" value={form.website} onChange={e => setForm({...form, website: e.target.value})}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                    placeholder="https://" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Product Category *</label>
                <select required value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 bg-white">
                  <option value="">Select a category...</option>
                  <option>Green AI Core & Prompt Engineering</option>
                  <option>ESG Reporting & Compliance</option>
                  <option>Supply Chain Carbon Intelligence</option>
                  <option>Sustainable Capital & Green Finance</option>
                  <option>Eco-Design & Branding</option>
                  <option>Green Marketing & Digital Strategy</option>
                  <option>Green Web3 & Blockchain</option>
                  <option>Green HR & Talent</option>
                  <option>CleanTech Startup & Accelerator</option>
                  <option>Other Green Tech Category</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Describe Your Products *</label>
                <textarea required rows={4} value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 resize-none"
                  placeholder="Briefly describe the products or frameworks you want to list, their target audience, and expected price range..." />
              </div>

              <button type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base text-white transition-all"
                style={{background: 'linear-gradient(135deg, #059669, #0d9488)'}}>
                Submit Vendor Application <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-center text-xs text-slate-400">By submitting, you agree to our vendor terms. We review all applications within 24 hours.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
