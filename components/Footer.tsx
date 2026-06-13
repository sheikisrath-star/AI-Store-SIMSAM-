import Link from 'next/link'
import { Zap } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-2 font-black text-white text-lg mb-3">
              <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              VerdaSync AI
            </Link>
            <p className="text-sm leading-relaxed">Enterprise Green Tech &amp; AI SaaS intelligence platform. Empowering organisations worldwide to achieve net-zero through cutting-edge sustainability frameworks.</p>
          </div>
          <div>
            <p className="font-semibold text-white mb-3 text-sm">Solutions</p>
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
          <p>© {new Date().getFullYear()} VerdaSync AI. All rights reserved. Worldwide B2B Green Tech &amp; AI Solutions.</p>
          <p>🌿 Building a sustainable future through technology</p>
        </div>
      </div>
    </footer>
  )
}
