'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react'

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-atlas-600" />
            <span className="font-bold text-slate-900">Cart ({totalItems()})</span>
          </div>
          <button onClick={closeCart} className="text-slate-400 hover:text-slate-700 transition-colors"><X className="w-5 h-5" /></button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <ShoppingBag className="w-12 h-12 text-slate-200" />
            <p className="font-semibold text-slate-700">Cart is empty</p>
            <p className="text-sm text-slate-400">Find a product you love.</p>
            <Link href="/products" onClick={closeCart} className="btn-primary text-sm mt-2">Browse Products</Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-3">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.product.gradient} rounded-xl flex-shrink-0 flex items-center justify-center text-2xl`}>{item.product.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.product.id}`} onClick={closeCart} className="text-sm font-semibold text-slate-900 hover:text-atlas-600 truncate block">{item.product.name}</Link>
                    <p className="text-xs text-slate-400 mb-2">${item.product.price}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 text-slate-500 hover:bg-slate-50 text-sm">−</button>
                        <span className="px-2 py-1 text-xs font-bold border-x border-slate-200">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 text-slate-500 hover:bg-slate-50 text-sm">+</button>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="text-slate-300 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <p className="font-bold text-slate-900 text-sm flex-shrink-0">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-slate-100">
              <div className="flex justify-between font-black text-lg mb-4">
                <span>Total</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <Link href="/checkout" onClick={closeCart} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5">
                Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/cart" onClick={closeCart} className="block text-center text-sm text-slate-400 hover:text-atlas-600 mt-3 transition-colors">View full cart</Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}
