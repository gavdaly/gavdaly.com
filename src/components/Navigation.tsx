import * as React from 'react'
import { Link } from 'gatsby'

export const Navigation = () => (
  <nav id="navigation" style={{ zIndex: 100 }}>
    <ul style={{ display: 'flex', listStyle: 'none', justifyContent: 'spaceBetween' }}>
      <li>
        <Link to="/about">about</Link>
      </li>
      <li>
        <Link to="/portfolio">portfolio</Link>
      </li>
    </ul>
  </nav>
)
