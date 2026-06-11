'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PRODUCTS, getProductById } from '@/lib/data'
import { useCartStore } from '@/lib/store'
import { ShoppingCart, Check, ArrowLeft, Star, Zap } from 'lucide-react'
import { useState } from 'react'

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const { addItem, openCart } = useCartStore() as { addItem: (p: typeof product) => void; openCart: () => void }
  const [added, setAdded] = useState(false)

  if (!product) return notFound()

  function handleAddToCart() {
    addItem(product!)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product visual */}
        <div>
          <div className={`h-80 bg-gradient-to-br ${product.gradient} rounded-3xl flex items-center justify-center shadow-xl`}>
            <span className="text-8xl">{product.emoji}</span>
          </div>
          {/* Social proof */}
          <div className="flex items-center gap-3 mt-6 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex -space-x-2">
              {['👤','👥','🧑'].map((e, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-atlas-100 flex items-center justify-center text-sm border-2 border-white">{e}</div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
                <span className="text-xs font-semibold text-slate-700 ml-1">4.9</span>
              </div>
              <p className="text-xs text-slate-500">2,000+ customers love this</p>
            </div>
          </div>
        </div>

        {/* Product info */}
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge bg-atlas-50 text-atlas-700 border border-atlas-100">{product.category}</span>
            {product.badge && <span className="badge bg-orange-50 text-orange-700 border border-orange-100">🔥 {product.badge}</span>}
            <span className="badge bg-purple-50 text-purple-700 border border-purple-100">✨ AI Generated</span>
          </div>

          <h1 className="text-3xl font-black text-slate-900 mb-3">{product.name}</h1>
          <p className="text-lg text-atlas-600 font-medium mb-4">{product.tagline}</p>
          <p className="text-slate-600 leading-relaxed mb-6">{product.description}</p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-black text-slate-900">${product.price}</span>
            {product.originalPrice && (
              <>
                <span className="text-xl text-slate-400 line-through">${product.originalPrice}</span>
                <span className="badge bg-green-100 text-green-700">
                  {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          {/* Add to cart */}
          <button onClick={handleAddToCart} className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-base transition-all mb-4 ${added ? 'bg-green-500 text-white' : 'btn-primary'}`}>
            {added ? <><Check className="w-5 h-5" /> Added to cart!</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
          </button>

          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-8">
            <Zap className="w-4 h-4 text-atlas-500" />
            Instant delivery · 30-day refund · Lifetime updates
          </div>

          {/* Features */}
          <div className="space-y-2 mb-6">
            <h3 className="font-bold text-slate-900 mb-3">What&apos;s inside:</h3>
            {product.features.map(f => (
              <div key={f} className="flex items-start gap-2 text-sm text-slate-700">
                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>

          {/* Includes */}
          <div className="bg-slate-50 rounded-2xl p-5">
            <h3 className="font-bold text-slate-900 mb-3 text-sm">Includes:</h3>
            <div className="flex flex-wrap gap-2">
              {product.includes.map(item => (
                <span key={item} className="bg-white text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-xs font-medium">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-black text-slate-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map(p => (
              <Link key={p.id} href={`/product/${p.id}`} className="card p-5 hover:-translate-y-1 transition-transform">
                <div className={`h-24 bg-gradient-to-br ${p.gradient} rounded-xl flex items-center justify-center text-3xl mb-4`}>{p.emoji}</div>
                <h3 className="font-bold text-slate-900 mb-1">{p.name}</h3>
                <p className="text-atlas-600 font-bold">${p.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
