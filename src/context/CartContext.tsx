import React, { createContext, useContext, useEffect, useState } from 'react'
import type { CartItem } from '../types'

type CartContextValue = {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, variantId: string | undefined, quantity: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  function addItem(item: CartItem) {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.productId === item.productId && p.variantId === item.variantId)
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx].quantity += item.quantity
        return copy
      }
      return [...prev, item]
    })
    console.log('analytics: add_to_cart', item)
  }

  function removeItem(productId: string, variantId?: string) {
    setItems((prev) => prev.filter((it) => !(it.productId === productId && it.variantId === variantId)))
  }

  function updateQuantity(productId: string, variantId: string | undefined, quantity: number) {
    setItems((prev) => prev.map((it) => (it.productId === productId && it.variantId === variantId ? { ...it, quantity } : it)))
  }

  function clear() {
    setItems([])
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear }}>{children}</CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
