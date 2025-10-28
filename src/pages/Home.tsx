import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../mock/products'
import ProductGrid from '../components/ProductGrid'
import { Product } from '../types'

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetchProducts().then(setProducts)
  }, [])

  return (
    <main className="container py-8">
      <section className="mb-8">
        <div className="bg-brand-50 rounded-lg p-6 flex flex-col md:flex-row items-center justify-between hero-box">
          <div style={{ maxWidth: '70%' }}>
            <h1 className="hero-title">Welcome to Shopper Store</h1>
            <p className="hero-desc">Discover high-quality products that match your lifestyle, from tech and fashion to home essentials.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <a href="/category/all" className="inline-block bg-brand-600 text-white px-4 py-2 rounded">{/* customizable label */}View Collections</a>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Featured</h2>
        <ProductGrid products={products} />
      </section>
    </main>
  )
}

export default Home
