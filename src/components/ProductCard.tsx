import React from 'react'
import type { Product } from '../types'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/currency'

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <article className="product-card border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition p-3">
      <Link to={`/product/${product.slug}`} aria-label={product.title}>
        <div className="h-48 bg-gray-100 flex items-center justify-center mb-3">
          <img src={product.images[0]?.src} alt={product.images[0]?.alt || product.title} className="max-h-full" />
        </div>
        <h3 className="text-sm font-medium mb-1">{product.title}</h3>
      </Link>
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">{formatCurrency(product.price, product.currency)}</div>
        {product.compareAtPrice && <div className="text-xs line-through text-gray-400">{formatCurrency(product.compareAtPrice)}</div>}
      </div>
    </article>
  )
}

export default ProductCard
