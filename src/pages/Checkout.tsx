import React, { useState } from 'react'
import { useCart } from '../context/CartContext'

const Checkout: React.FC = () => {
  const { items, clear } = useCart()
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !address) {
      setError('Please fill name and address')
      return
    }
    // simulate payment
    console.log('analytics: start_checkout', { items })
    setTimeout(() => {
      console.log('analytics: payment_success')
      clear()
      window.location.href = '/account?order=ord_0001'
    }, 600)
  }

  return (
    <main className="container py-8 page-full">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <form onSubmit={handleSubmit} className="mt-6 max-w-lg">
        <label className="block">
          <span className="text-sm">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
        </label>
        <label className="block mt-3">
          <span className="text-sm">Address</span>
          <input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
        </label>
        {error && <div className="text-red-600 mt-2">{error}</div>}
        <div className="mt-4">
          <button className="bg-brand-500 text-white rounded px-4 py-2">Pay & place order</button>
        </div>
      </form>
    </main>
  )
}

export default Checkout
