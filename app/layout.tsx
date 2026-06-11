import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'

export const metadata: Metadata = {
  title: 'AtlasAI Store — AI-Powered Digital Products',
  description: 'World-class AI digital products. Built and marketed by autonomous AI agents.',
  openGraph: {
    title: 'AtlasAI Store',
    description: 'AI-powered digital products store',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <CartSidebar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
