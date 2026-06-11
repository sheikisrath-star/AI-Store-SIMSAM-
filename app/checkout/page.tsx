'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { Shield, Zap, Check } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', card: '4242 4242 4242 4242', expiry: '12/27', cvc: '123' })

  if (totalPrice() === 0 && !success) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <h1 className="text-2xl font-black text-slate-800 mb-3">Nothing to checkout</h1>
        <Link href="/products" className="btn-primary">Browse Products</Link>
      </div>
    )
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-green-500" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-3">Order confirmed!</h1>
        <p className="text-slate-500 mb-2">Your digital products are on their way to <strong>{form.email}</strong>.</p>
        <p className="text-sm text-slate-400 mb-8">Check your inbox — delivery usually takes under 60 seconds.</p>
        <Link href="/products" className="btn-primary">Shop more products</Link>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total: totalPrice(), email: form.email, name: form.name }),
      })
    } catch {}
    await new Promise(r => setTimeout(r, 1400))
    clearCart()
    setSuccess(true)
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Checkout</h1>
      <div className="grid md:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-3 space-y-6">
          <div className="card p-6 space-y-4">
            <h2 className="font-bold text-slate-900">Contact</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Full name</label>
              <input required className="input" placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <input required type="email" className="input" placeholder="jane@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
          </div>

          <div className="card p-6 space-y-4">
            <h2 className="font-bold text-slate-900">Payment</h2>
            <p className="text-xs text-slate-400 flex items-center gap-1"><Shield className="w-3.5 h-3.5" /> Secured by Stripe — pre-filled with test card</p>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Card number</label>
              <input className="input font-mono" value={form.card} onChange={e => setForm(f => ({ ...f, card: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Expiry</label>
                <input className="input" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">CVC</label>
                <input className="input" value={form.cvc} onChange={e => setForm(f => ({ ...f, cvc: e.target.value }))} />
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2">
            {loading ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...</>
            ) : (
              <><Zap className="w-4 h-4" /> Pay ${totalPrice().toFixed(2)}</>
            )}
          </button>
        </form>

        <div className="md:col-span-2">
          <div className="card p-5">
            <h3 className="font-bold text-slate-900 mb-4">Order summary</h3>
            <div className="space-y-3 mb-4">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <span className="text-2xl">{item.product.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{item.product.name}</p>
                    <p className="text-xs text-slate-400">×{item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between font-black text-lg">
              <span>Total</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-4 space-y-2 text-xs text-slate-500">
            {['Instant digital delivery', '30-day money-back guarantee', 'Lifetime access & updates'].map(t => (
              <div key={t} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-green-500" />{t}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
