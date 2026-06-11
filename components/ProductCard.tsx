'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { ShoppingCart, Check } from 'lucide-react'
import { useState } from 'react'
import { Product } from '@/lib/data'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore()
  const [added, setAdded] = useState(false)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <Link href={`/product/${product.id}`} className="card group block hover:-translate-y-1 transition-transform duration-200">
      <div className={`h-40 bg-gradient-to-br ${product.gradient} rounded-2xl flex items-center justify-center text-5xl mb-4`}>
        {product.emoji}
      </div>
      <div className="px-1">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="badge bg-atlas-50 text-atlas-700 border border-atlas-100 text-[11px]">{product.category}</span>
          {product.badge && <span className="badge bg-orange-50 text-orange-700 border border-orange-100 text-[11px]">🔥 {product.badge}</span>}
        </div>
        <h3 className="font-bold text-slate-900 mb-1 leading-snug">{product.name}</h3>
        <p className="text-xs text-slate-500 mb-4 line-clamp-2">{product.tagline}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900">${product.price}</span>
            {product.originalPrice && <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>}
            {discount && <span className="badge bg-green-100 text-green-700 text-[10px]">{discount}% off</span>}
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all ${added ? 'bg-green-500 text-white' : 'bg-atlas-600 text-white hover:bg-atlas-700'}`}
          >
            {added ? <><Check className="w-3.5 h-3.5" /> Added</> : <><ShoppingCart className="w-3.5 h-3.5" /> Add</>}
          </button>
        </div>
      </div>
    </Link>
  )
}
