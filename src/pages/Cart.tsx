import React from 'react'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/currency'
import products from '../mock/products'

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem } = useCart()

  const subtotal = items.reduce((s, it) => s + it.unitPrice * it.quantity, 0)

  return (
    // make the page fill the viewport so the global footer can sit at the bottom
    <main className="min-h-screen flex flex-col page-full">
      <div className="container py-8 flex-1">
        <h1 className="text-2xl font-bold">Your cart</h1>
        {items.length === 0 ? (
          <p className="mt-4 text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {items.map((it) => {
              const product = products.find((p) => p.id === it.productId)
              const title = product?.title ?? it.productId
              return (
                <div
                  key={`${it.productId}-${it.variantId}`}
                  className="border rounded p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <div className="font-medium">{title}</div>
                    {it.variantId ? <div className="text-sm text-gray-500">{it.variantId}</div> : null}
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={it.quantity}
                      min={1}
                      onChange={(e) => updateQuantity(it.productId, it.variantId, Number(e.target.value))}
                      className="w-20 sm:w-16 border rounded px-2 py-1"
                    />
                    <div className="whitespace-nowrap">{formatCurrency(it.unitPrice)}</div>
                    <button onClick={() => removeItem(it.productId, it.variantId)} className="text-sm text-red-600">
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}

            <div className="text-right font-semibold">Subtotal: {formatCurrency(subtotal)}</div>
          </div>
        )}
      </div>
    </main>
  )
}

export default CartPage
