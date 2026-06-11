'use client'

import Link from 'next/link'
import { useCartStore } from '@/lib/store'
import { ShoppingCart, Zap } from 'lucide-react'

export default function Navbar() {
  const { totalItems, toggleCart } = useCartStore()
  const count = totalItems()

  return (
    <nav className="fixed top-0 inset-x-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-slate-900 hover:text-atlas-600 transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-atlas-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          AtlasAI
        </Link>

        <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/products" className="hover:text-atlas-600 transition-colors">Products</Link>
          <Link href="/dashboard" className="hover:text-atlas-600 transition-colors">AI Dashboard</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="sm:hidden text-sm font-semibold text-atlas-600">Dashboard</Link>
          <button onClick={toggleCart} className="relative p-2 text-slate-700 hover:text-atlas-600 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-atlas-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <Link href="/products" className="hidden sm:block btn-primary text-sm px-4 py-2">Shop Now</Link>
        </div>
      </div>
    </nav>
  )
}
