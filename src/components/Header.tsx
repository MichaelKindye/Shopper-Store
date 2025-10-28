import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import SITE from '../config/site'
import { useTheme } from '../context/ThemeContext'
import { fetchProducts } from '../mock/products'
import Sidebar from './Sidebar'

type SearchResult = { id: string; title: string; slug: string; images?: { src: string }[]; tags?: string[] }

export const Header: React.FC = () => {
  const { items } = useCart()
  const count = items.reduce((s, it) => s + it.quantity, 0)
  const { theme, toggle } = useTheme()

  // Sidebar state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Search state
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const [allProducts, setAllProducts] = useState<SearchResult[]>([])

  useEffect(() => {
    fetchProducts().then((prods) => setAllProducts(prods as any))
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      const q = query.trim().toLowerCase()
      if (!q) {
        setResults([])
        setOpen(false)
        return
      }
      const filtered = allProducts.filter((p) => p.title.toLowerCase().includes(q) || p.tags?.some((t: string) => t.includes(q)) || p.slug.includes(q))
      setResults(filtered.slice(0, 8))
      setOpen(true)
    }, 180)
    return () => clearTimeout(handler)
  }, [query, allProducts])

  return (
    <>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <div className="header-left" style={{ minWidth: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
            <button className="mobile-only" aria-label="Open menu" onClick={() => setSidebarOpen(true)} style={{ background: 'transparent', border: 'none', padding: 6 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            {/* Desktop logo restored (visible on desktop only) */}
            <Link to="/" className="desktop-only nav-link" style={{ fontWeight: 700, marginLeft: 8, marginRight: 8 }}>
              {SITE.title}
            </Link>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', minWidth: 0 }}>
              <input
                aria-label="Search products"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block border rounded px-3 py-2 header-search"
                style={{ background: 'var(--bg)', color: 'var(--text)' }}
              />

              {open && results.length > 0 && (
                <div className="search-dropdown" role="listbox" aria-label="Search results">
                  {results.map((r) => (
                    <Link
                      key={r.id}
                      to={`/product/${r.slug}`}
                      className="search-item"
                      onClick={() => {
                        setOpen(false)
                        setQuery('')
                      }}
                      role="option"
                    >
                      <div style={{ width: '100%' }} className="font-medium">
                        {r.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <div className="desktop-only" style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>
              <Link to="/category/all" className="nav-link nav-text text-sm">{SITE.nav.collections}</Link>
              <Link to="/account" className="nav-link nav-text text-sm">{SITE.nav.account}</Link>
            </div>

            <Link to="/cart" className="relative inline-flex items-center nav-link cart-icon" aria-label="View cart">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4" /></svg>
              {count > 0 && <span className="cart-badge" aria-hidden="false">{count}</span>}
            </Link>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header

