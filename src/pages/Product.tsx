import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchProductBySlug } from '../mock/products'
import { formatCurrency } from '../utils/currency'
import { useCart } from '../context/CartContext'

const ProductPage: React.FC = () => {
  const { slug } = useParams()
  const [product, setProduct] = useState<any | null>(null)
  const { addItem } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    if (!slug) return
    fetchProductBySlug(slug).then(setProduct)
  }, [slug])

  if (!product) return <div className="container py-8">Loading...</div>

  function handleAdd() {
    addItem({ productId: product.id, variantId: product.variants[0]?.id, quantity: 1, unitPrice: product.price })
  }

  function handleBuyNow() {
    addItem({ productId: product.id, variantId: product.variants[0]?.id, quantity: 1, unitPrice: product.price })
    navigate('/checkout')
  }

  return (
    <main className="container py-8 page-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-100 h-96 flex items-center justify-center">
            <img src={product.images[0]?.src} alt={product.images[0]?.alt} className="max-h-full" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="mt-2 text-gray-700">{product.shortDescription}</p>
          <div className="mt-4 text-xl font-semibold">{formatCurrency(product.price, product.currency)}</div>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={handleAdd} className="bg-brand-500 text-white rounded px-4 py-2">Add to cart</button>
            <button onClick={handleBuyNow} className="border rounded px-4 py-2">Buy now</button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductPage
