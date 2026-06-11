import { PRODUCTS, CATEGORIES } from '@/lib/data'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  const filtered = searchParams.category
    ? PRODUCTS.filter(p => p.category === searchParams.category)
    : PRODUCTS

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-slate-900 mb-2">All Products</h1>
        <p className="text-slate-500">AI-generated, human-approved. 30-day guarantee on everything.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <a href="/products" className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${!searchParams.category ? 'bg-atlas-600 text-white border-atlas-600' : 'bg-white text-slate-600 border-slate-200 hover:border-atlas-300'}`}>
          All ({PRODUCTS.length})
        </a>
        {CATEGORIES.map(cat => (
          <a key={cat} href={`/products?category=${cat}`} className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${searchParams.category === cat ? 'bg-atlas-600 text-white border-atlas-600' : 'bg-white text-slate-600 border-slate-200 hover:border-atlas-300'}`}>
            {cat}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  )
}
