import React, { useEffect } from 'react'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import { useColorMode } from 'theme-ui'

import NavigationFooter from '@components/Navigation/Navigation.Footer'
import { Navigation } from '@components/Navigation'
import { LogoLink } from '@components/LogoLink'
import { PageControls } from '@components/PageControls'

import ArticlesContextProvider from '../sections/articles/Articles.List.Context'

import { globalStyles } from '@styles'

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
export const Layout: React.FC<{}> = ({ children }) => {
  const [colorMode] = useColorMode()

  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*')
  }, [colorMode])

  return (
    <ArticlesContextProvider>
      <Container id={colorMode}>
        <Global styles={globalStyles} />
        <div id="logo">
          <LogoLink />
        </div>
        <PageControls />
        <Navigation />
        <main id="main">{children}</main>
        <NavigationFooter id="footer" />
      </Container>
    </ArticlesContextProvider>
  )
}

export default Layout

const Container = styled.div`
  background: var(--color-background);
  transition: background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    'logo . controls'
    'main main main'
    'footer footer footer';
  grid-template-rows: auto 1fr auto;
  padding: 1rem;
  #logo {
    grid-area: logo;
  }
  #controls {
    grid-area: controls;
  }
  #main {
    grid-area: main;
  }
  #footer {
    grid-area: footer;
  }
  @media (min-width: 44rem) {
    grid-template-areas:
      'logo controls'
      'navigation navigation'
      'main main'
      'footer footer';
    grid-template-rows: auto auto 1fr auto;
    #navigation {
      grid-area: navigation;
    }
    background-color: yellow;
  }
`
