import React from 'react'
import SITE from '../config/site'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-surface py-8">
      <div className="container text-sm text-gray-600">
        <div className="flex justify-between">
          <div>© {new Date().getFullYear()} {SITE.title}</div>
          <div><a href="https://www.linkedin.com/in/haile-michael-kindye-15bb36370/" target="_blank" rel="noreferrer" className="nav-link">Contact Developer</a></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
