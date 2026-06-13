import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CartSidebar from '@/components/CartSidebar'

export const metadata: Metadata = {
  title: 'VerdaSync AI — Enterprise Green Tech & AI Solutions',
  description: 'B2B Green Technology & AI SaaS platform. Enterprise-grade sustainability intelligence products for global organisations.',
  openGraph: {
    title: 'VerdaSync AI',
    description: 'Enterprise Green Tech & AI SaaS platform for sustainability-driven organisations',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <CartSidebar />
        <main cl