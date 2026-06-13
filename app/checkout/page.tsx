'use client'

import { useCartStore } from '@/lib/store'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, ArrowLeft, Shield, Zap, Lock } from 'lucide-react'

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore()
  const total = totalPrice()
  const [form, setForm] = useState({ name: '', email: '', country: '' })
  const [submitted, setSubmitted] = useState(false)

  if (items.length === 0 && !submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-slate-900 mb-3">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Add some products before checking out.</p>
        <Link href="/products" className="btn-primary px-8 py-3">Browse Products</Link>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-3">Order Confirmed!</h2>
        <p className="text-slate-500 mb-8">Your payment is being processed via PayHere. Download links will arrive at your email shortly.</p>
        <Link href="/products" className="btn-primary px-8 py-3">Continue Shopping</Link>
      </div>
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // PayHere integration — replace merchant_id with your real ID from payhere.lk
    const orderId = `VS-${Date.now()}`
    const payhereUrl = `https://www.payhere.lk/pay/checkout`
    const params = new URLSearchParams({
      merchant_id: '1227xxx', // TODO: replace with your PayHere Merchant ID
      return_url: `${window.location.origin}/checkout/success`,
      cancel_url: `${window.location.origin}/checkout`,
      notify_url: `${window.location.origin}/api/payhere-notify`,
      order_id: orderId,
      items: items.map(i => i.product.name).join(', ').substring(0, 255),
      currency: 'USD',
      amount: total.toFixed(2),
      first_name: form.name.split(' ')[0] || form.name,
      last_name: form.name.split(' ').slice(1).join(' ') || 'Customer',
      email: form.email,
      phone: '0000000000',
      address: 'Digital Product',
      city: 'Online',
      country: form.country || 'Sri Lanka',
    })
    // Redirect to PayHere payment page
    window.location.href = `${payhereUrl}?${params.toString()}`
    setSubmitted(true)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to products
      </Link>

      <h1 className="text-3xl font-black text-slate-900 mb-2">Secure Checkout</h1>
      <p className="text-slate-500 mb-10">Complete your order — instant digital delivery worldwide</p>

      <div className="grid md:grid-cols-5 gap-10">
        {/* Form */}
        <div className="md:col-span-3">
          <form onSubmit={handleSubmit} className="space-y-5">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Your Details</h2>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name *</label>
              <input required type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                placeholder="John Smith" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address *</label>
              <input required type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                placeholder="you@company.com" />
              <p className="text-xs text-slate-400 mt-1">Your download links will be sent to this email</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Country *</label>
              <select required value={form.country} onChange={e => setForm({...form, country: e.target.value})}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-400 bg-white">
                <option value="">Select your country...</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Germany</option>
                <option>Australia</option>
                <option>Canada</option>
                <option>Singapore</option>
                <option>India</option>
                <option>Sri Lanka</option>
                <option>Other</option>
              </select>
            </div>

            {/* Payment section */}
            <div className="border border-slate-200 rounded-2xl p-5 mt-2">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-500" /> Secure Payment via PayHere
              </h3>
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-sm text-emerald-800">
                <p className="font-semibold mb-1">Accepted payment methods:</p>
                <p className="text-emerald-700">Visa · Mastercard · Amex · Local Bank Transfer (LKR) · International USD</p>
              </div>
              <p className="text-xs text-slate-400 mt-3">You will be redirected to PayHere&apos;s secure payment page to complete your purchase.</p>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4 py-2">
              {[
                { icon: <Shield className="w-3.5 h-3.5" />, text: '256-bit SSL encryption' },
                { icon: <Zap className="w-3.5 h-3.5" />, text: 'Instant delivery' },
                { icon: <Lock className="w-3.5 h-3.5" />, text: '30-day guarantee' },
              ].map(t => (
                <div key={t.text} className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span className="text-emerald-500">{t.icon}</span> {t.text}
                </div>
              ))}
            </div>

            <button type="submit"
              className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all shadow-lg shadow-emerald-500/25 hover:opacity-90"
              style={{background: 'linear-gradient(135deg, #059669, #0d9488)'}}>
              Pay ${total.toFixed(2)} — Proceed to PayHere
            </button>

            <p className="text-center text-xs text-slate-400">
              Powered by PayHere · Your payment details are never stored on our servers
            </p>
          </form>
        </div>

        {/* Order summary */}
        <div className="md:col-span-2">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 sticky top-24">
            <h2 className="font-bold text-slate-900 mb-5">Order Summary</h2>
            <div className="space-y-4 mb-5">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3 items-start">
                  <div className={`w-10 h-10 bg-gradient-to-br ${item.product.gradient} rounded-lg flex items-center justify-center text-lg flex-shrink-0`}>
                    {item.product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-bold text-slate-900 flex-shrink-0">${(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span><span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Delivery</span>
                <span className="text-emerald-600 font-semibold">FREE (Instant)</span>
              </div>
              <div className="flex justify-between font-black text-slate-900 text-lg pt-2 border-t border-slate-200">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4 bg-emerald-50 rounded-xl p-3 text-xs text-emerald-700 text-center">
              🌿 Your purchase supports global sustainability initiatives
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
