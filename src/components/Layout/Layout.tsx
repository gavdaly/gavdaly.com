import React, { useEffect } from 'react'
import { Global } from '@emotion/core'
import styled from '@emotion/styled'
import { useColorMode } from 'theme-ui'

import NavigationFooter from '@components/Navigation/Navigation.Footer'
import NavigationHeader from '@components/Navigation/Navigation.Header'
import ArticlesContextProvider from '../../sections/articles/Articles.List.Context'

import { globalStyles } from '@styles'

/**
 * <Layout /> needs to wrap every page as it provides styles, navigation,
 * and the main structure of each page. Within Layout we have the <Container />
 * which hides a lot of the mess we need to create our Desktop and Mobile experiences.
 */
const Layout: React.FC<{}> = ({ children }) => {
  const [colorMode] = useColorMode()

  useEffect(() => {
    parent.postMessage({ theme: colorMode }, '*')
  }, [colorMode])

  return (
    <ArticlesContextProvider>
      <Container id={colorMode}>
        <Global styles={globalStyles} />
        <NavigationHeader id="header" />
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
    'header'
    'main'
    'footer';
  padding: 1rem;
  #header {
    grid-area: header;
  }
  #main {
    grid-area: main;
  }
  #footer {
    grid-area: footer;
  }
`
