'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCartStore()

  if (totalItems() === 0) {
    return (
      <div className="max-w-lg mx-auto px-6 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-6" />
        <h1 className="text-2xl font-black text-slate-800 mb-3">Cart is empty</h1>
        <p className="text-slate-500 mb-8">Browse our AI-generated products to get started.</p>
        <Link href="/products" className="btn-primary">Browse Products</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black text-slate-900">Your Cart</h1>
        <button onClick={clearCart} className="text-sm text-slate-400 hover:text-red-500 transition-colors">Clear all</button>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.product.id} className="card p-5 flex gap-4">
              <div className={`w-20 h-20 bg-gradient-to-br ${item.product.gradient} rounded-xl flex-shrink-0 flex items-center justify-center text-3xl`}>{item.product.emoji}</div>
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.product.id}`} className="font-bold text-slate-900 hover:text-atlas-600 transition-colors">{item.product.name}</Link>
                <p className="text-sm text-slate-400 mt-0.5">{item.product.category}</p>
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-1.5 text-slate-600 hover:bg-slate-50">−</button>
                    <span className="px-3 py-1.5 text-sm font-semibold border-x border-slate-200">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-1.5 text-slate-600 hover:bg-slate-50">+</button>
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="text-slate-300 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-black text-slate-900 text-lg">${(item.product.price * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-slate-400">${item.product.price} each</p>
              </div>
            </div>
          ))}
        </div>
        <div className="card p-6 h-fit sticky top-20">
          <h2 className="font-bold text-slate-900 mb-4">Summary</h2>
          <div className="space-y-2 text-sm mb-4">
            <div className="flex justify-between text-slate-600"><span>Items ({totalItems()})</span><span>${totalPrice().toFixed(2)}</span></div>
            <div className="flex justify-between text-slate-600"><span>Delivery</span><span className="text-green-600">Free</span></div>
          </div>
          <div className="border-t border-slate-100 pt-4 mb-6">
            <div className="flex justify-between font-black text-xl"><span>Total</span><span>${totalPrice().toFixed(2)}</span></div>
          </div>
          <Link href="/checkout" className="btn-primary w-full flex items-center justify-center gap-2">
            Checkout <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/products" className="block text-center text-sm text-slate-400 hover:text-atlas-600 mt-3 transition-colors">Continue shopping</Link>
        </div>
      </div>
    </div>
  )
}
