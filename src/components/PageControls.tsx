import * as React from 'react'

import styled from '@emotion/styled'

import { DarkModeToggle } from '@components/DarkModeToggle'
import { SharePageButton } from '@components/SharePageButton'


export const PageControls = () => (
    <ControlLayout>
        <DarkModeToggle />
        <SharePageButton />
    </ControlLayout>)


const ControlLayout = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
