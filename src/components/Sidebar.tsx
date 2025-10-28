import React from 'react'
import { Link } from 'react-router-dom'
import SITE from '../config/site'
import { useTheme } from '../context/ThemeContext'
import { useCart } from '../context/CartContext'

export const Sidebar: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const { theme, toggle } = useTheme()
  const { items } = useCart()
  const count = items.reduce((s, it) => s + it.quantity, 0)

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-hidden={!open}>
        <button className="close-btn" onClick={onClose} aria-label="Close menu">Close</button>
        <nav>
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/category/all" onClick={onClose}>{SITE.nav.collections}</Link>
          <Link to="/account" onClick={onClose}>{SITE.nav.account}</Link>
          <Link to="/cart" onClick={onClose}>Cart {count > 0 && `(${count})`}</Link>
          <Link to="/about" onClick={onClose}>About</Link>
        </nav>

        <div style={{ marginTop: 16 }}>
          <button onClick={() => { toggle(); onClose() }} className="border rounded px-3 py-1 toggle">{theme === 'dark' ? 'Light' : 'Dark'}</button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
