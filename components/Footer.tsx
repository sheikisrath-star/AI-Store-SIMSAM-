import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2 font-black text-white text-lg mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-atlas-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              AtlasAI Store
            </Link>
            <p className="text-sm leading-relaxed">AI-generated digital products. Every listing created, priced, and marketed by autonomous AI agents.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3 text-sm">Store</p>
            <nav className="space-y-2 text-sm">
              <Link href="/products" className="block hover:text-white transition-colors">All Products</Link>
              <Link href="/cart" className="block hover:text-white transition-colors">Cart</Link>
              <Link href="/checkout" className="block hover:text-white transition-colors">Checkout</Link>
            </nav>
          </div>
          <div>
            <p className="font-semibold text-white mb-3 text-sm">Platform</p>
            <nav className="space-y-2 text-sm">
              <Link href="/dashboard" className="block hover:text-white transition-colors">AI Command Center</Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© {new Date().getFullYear()} AtlasAI Store. All rights reserved.</p>
          <p>Built with 5 autonomous AI agents 🤖</p>
        </div>
      </div>
    </footer>
  )
}
