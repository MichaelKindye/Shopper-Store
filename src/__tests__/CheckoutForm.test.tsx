import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Checkout from '../pages/Checkout'
import { CartProvider } from '../context/CartContext'

test('checkout form validation requires name and address', async () => {
  const user = userEvent.setup()
  render(
    <CartProvider>
      <Checkout />
    </CartProvider>
  )

  const button = screen.getByText(/Pay & place order/i)
  await user.click(button)
  expect(await screen.findByText(/Please fill name and address/)).toBeInTheDocument()
})
