import React from 'react'
import styled from '@emotion/styled'

import { IconWrapper } from './IconWrapper'

interface IProps {
  toggleColorMode: () => void
  colorMode: 'dark' | 'light'
}

export const DarkModeToggle: React.FC<IProps> = ({ toggleColorMode, colorMode }) => {
  const isDark = colorMode === `dark`

  function _toggleColorMode(event: React.SyntheticEvent) {
    event.preventDefault()
    toggleColorMode()
  }

  return (
    <IconWrapper
      onClick={_toggleColorMode}
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
    >
      <MoonOrSun className={isDark ? 'dark' : 'light'} />
      <MoonMask className={isDark ? 'dark' : 'light'} />
    </IconWrapper>
  )
}

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 4px solid var(--color-primary);
  background: var(--color-primary);
  transform: scale(1);
  transition: all 0.45s ease;
  overflow: hidden;
  &.dark {
    transform: scale(0.55);
    overflow: visible;
  }

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 var(--color-primary), 0 23px 0 var(--color-primary), 23px 0 0 var(--color-primary),
      -23px 0 0 var(--color-primary), 15px 15px 0 var(--color-primary), -15px 15px 0 var(--color-primary),
      15px -15px 0 var(--color-primary), -15px -15px 0 var(--color-primary);
    transform: scale(1);
    transition: all 0.35s ease;
    &.dark {
      transform: scale(0);
    }
  }
`

const MoonMask = styled.div`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: var(--color-background);
  transform: translate(14px, -14px);
  opacity: 0;
  transition: background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad), transform 0.45s ease;
  &.light {
    transform: translate(0, 0);
    opacity: 1;
  }
`
