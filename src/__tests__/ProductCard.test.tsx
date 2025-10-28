import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const product = {
  id: 'p1',
  slug: 'test-product',
  title: 'Test Product',
  shortDescription: 'Short',
  description: '',
  price: 9.99,
  currency: 'USD',
  images: [{ src: '/img.png', alt: 'img' }],
  variants: [],
  inventory: { total: 1, perVariant: {} },
  tags: [],
  categories: [],
  createdAt: ''
}

test('renders product card with title and price', () => {
  render(
    <MemoryRouter>
      <ProductCard product={product as any} />
    </MemoryRouter>
  )
  expect(screen.getByText(/Test Product/)).toBeInTheDocument()
  expect(screen.getByText(/\$9.99/)).toBeInTheDocument()
})
