import { fetchProducts } from './products'

// Seed localStorage for cart/wishlist/orders
export async function seed() {
  await fetchProducts()
  if (!localStorage.getItem('cart')) localStorage.setItem('cart', JSON.stringify([]))
  if (!localStorage.getItem('wishlist')) localStorage.setItem('wishlist', JSON.stringify([]))
  if (!localStorage.getItem('orders')) localStorage.setItem('orders', JSON.stringify([]))
}

export default seed
