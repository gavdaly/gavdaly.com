import * as React from 'react'

import styled from '@emotion/styled'

import { IconWrapper } from './IconWrapper'

import { DarkModeToggle } from '../components/DarkModeToggle'
import { SharePageButton } from '../components/SharePageButton'

interface IProps {
  toggleColorMode: () => void
  colorMode: 'light' | 'dark'
}

export const PageControls: React.FC<IProps> = ({ toggleColorMode, colorMode }) => {
  const isDark = colorMode === `dark`

  function _toggleColorMode(event: React.SyntheticEvent) {
    event.preventDefault()
    toggleColorMode()
  }
  return (
    <ControlLayout id="controls">
      <IconWrapper
        onClick={_toggleColorMode}
        aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
        title={isDark ? 'Activate light mode' : 'Activate dark mode'}
      >
        <DarkModeToggle colorMode={colorMode} />
      </IconWrapper>

      <SharePageButton />
    </ControlLayout>
  )
}

const ControlLayout = styled.div`
  display: flex;
  align-items: center;
`
