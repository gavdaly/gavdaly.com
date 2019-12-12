import * as React from 'react'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Link } from 'gatsby'

export const Navigation = () => (
  <nav css={style} id="navigation" style={{ zIndex: 100 }}>
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

const style = css`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  transform: translateX(-100%);
  transition: transfrom 400ms ease-in-out;
  .show {
    transform: translate(0);
  }
  @media (min-width: 44rem) {
    position: static;
    transform: none;
    height: auto;
    width: auto;
  }
`
