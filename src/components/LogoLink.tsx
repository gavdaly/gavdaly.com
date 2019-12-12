import * as React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import Logo from '../components/Logo'

export const LogoLink = () => (
  <LL to="/" id="logo" title="Navigate back to the homepage" aria-label="Navigate back to the homepage">
    <Logo />
  </LL>
)

const LL = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;

  &:focus::after {
    content: '';
    position: absolute;
    left: -5%;
    top: -20%;
    width: 110%;
    height: 140%;
    border: 2px solid var(--color-accent);
    border-radius: 5px;
  }
`
