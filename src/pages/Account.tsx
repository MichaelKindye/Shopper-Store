import React from 'react'

const Account: React.FC = () => {
  const params = new URLSearchParams(window.location.search)
  const order = params.get('order')

  return (
    <main className="container py-8 page-full">
      <h1 className="text-2xl font-bold">Account</h1>
      {order ? (
        <div className="mt-4">Order <strong>{order}</strong> placed — thanks!</div>
      ) : (
        <div className="mt-4">Orders and profile will appear here.</div>
      )}
    </main>
  )
}

export default Account
