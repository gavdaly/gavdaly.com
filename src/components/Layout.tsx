import React, { useEffect, useState } from 'react'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'

import Footer from '../components/Footer'
import { Navigation } from '../components/Navigation'
import { LogoLink } from '../components/LogoLink'
import { PageControls } from '../components/PageControls'

import ArticlesContextProvider from '../sections/articles/Articles.List.Context'

import { globalStyles } from '../styles'

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
export const Layout: React.FC<{}> = ({ children }) => {
  const [colorMode, setColorMode] = useState(`light`)

  function toggleColorMode() {
    setColorMode(colorMode === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*')
  }, [colorMode])

  return (
    <ArticlesContextProvider>
      <Global styles={globalStyles} />
      <Container id={colorMode}>
        <LogoLink />
        <PageControls toggleColorMode={toggleColorMode} colorMode={colorMode} />
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
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
  grid-template-columns: auto 1fr auto;
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
    padding: 0 10vw;
    grid-template-areas:
      'logo       .          .          controls'
      'navigation navigation navigation navigation'
      'main       main       main       main'
      'footer     footer     footer     footer';
    grid-template-rows: auto auto 1fr auto;
    grid-template-columns: auto 1fr 1fr auto;
    #navigation {
      grid-area: navigation;
    }
  }
`
