import React from 'react'
import styled from "@emotion/styled"
import { useColorMode } from "theme-ui"

import { IconWrapper } from './IconWrapper'

export const DarkModeToggle: React.FC<{}> = () => {
    const [colorMode, setColorMode] = useColorMode()
    const isDark = colorMode === `dark`

    function toggleColorMode(event) {
        event.preventDefault()
        setColorMode(isDark ? `light` : `dark`)
    }

    return (
        <IconWrapper
            isDark={isDark}
            onClick={toggleColorMode}
            data-a11y="false"
            aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
            title={isDark ? "Activate light mode" : "Activate dark mode"}
        >
            <MoonOrSun isDark={isDark} />
            <MoonMask isDark={isDark} />
        </IconWrapper>
    )
}

// This is based off a codepen! Much appreciated to: https://codepen.io/aaroniker/pen/KGpXZo
const MoonOrSun = styled.div<{ isDark: boolean }>`
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 4px solid var(--color-primary);
  background: var(--color-primary);
  transform: scale(${p => (p.isDark ? 0.55 : 1)});
  transition: all 0.45s ease;
  overflow: ${p => (p.isDark ? "visible" : "hidden")};

  &::before {
    content: "";
    position: absolute;
    right: -9px;
    top: -9px;
    height: 24px;
    width: 24px;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
    opacity: ${p => (p.isDark ? 0 : 1)};
    transition: transform 0.45s ease;
  }

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: -4px 0 0 -4px;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0 -23px 0 var(--color-primary),
      0 23px 0 var(--color-primary),
      23px 0 0 var(--color-primary),
      -23px 0 0 var(--color-primary),
      15px 15px 0 var(--color-primary),
      -15px 15px 0 var(--color-primary),
      15px -15px 0 var(--color-primary),
      -15px -15px 0 var(--color-primary);
    transform: scale(${p => (p.isDark ? 1 : 0)});
    transition: all 0.35s ease;
  }
`

const MoonMask = styled.div<{ isDark: boolean }>`
  position: absolute;
  right: -1px;
  top: -8px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 0;
  background: var(--color-background);
  transform: translate(${p => (p.isDark ? "14px, -14px" : "0, 0")});
  opacity: ${p => (p.isDark ? 0 : 1)};
  transition: background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad), transform 0.45s ease;
`