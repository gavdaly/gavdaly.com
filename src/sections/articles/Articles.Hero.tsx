import React, { useContext } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'

import Bio from '../../components/Bio'
import Icons from '../../icons'
import { IAuthor } from '../../types'

import { GridLayoutContext } from './Articles.List.Context'

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              heading
              maxWidth
            }
          }
        }
      }
    }
  }
`

interface IProps {
  authors: IAuthor[]
}

const ArticlesHero: React.FC<IProps> = ({ authors }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(GridLayoutContext)

  const results = useStaticQuery(authorQuery)
  const hero = results.site.edges[0].node.siteMetadata.hero
  const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles'
  const featuredAuthor = authors.find(author => author.featured)

  if (!featuredAuthor) {
    throw new Error(`
      No featured Author found.
      Please ensure you have at least featured Author.
  `)
  }

  return (
    <section id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <HeroHeading dangerouslySetInnerHTML={{ __html: hero.heading }} />
      </HeadingContainer>
      <SubheadingContainer>
        <Bio author={featuredAuthor} />
        <GridControlsContainer>
          <GridButton
            onClick={() => setGridLayout('tiles')}
            active={tilesIsActive}
            title="Show articles in Tile grid"
            aria-label="Show articles in Tile grid"
          >
            <Icons.Tiles />
          </GridButton>
          <GridButton
            onClick={() => setGridLayout('rows')}
            active={!tilesIsActive}
            title="Show articles in Row grid"
            aria-label="Show articles in Row grid"
          >
            <Icons.Rows />
          </GridButton>
        </GridControlsContainer>
      </SubheadingContainer>
    </section>
  )
}

export default ArticlesHero

const SubheadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const GridControlsContainer = styled.div`
  display: flex;
  align-items: center;
`

const HeadingContainer = styled.div`
  margin: 100px 0;
`

const HeroHeading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 3rem;
  line-height: 1.15;
  color: var(--color-primary);

  a {
    color: var(--color-accent);
  }
`

const GridButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &:hover {
    background: var(--color-hover);
  }

  &:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    border: 2px solid var(--color-accent);
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg {
    opacity: ${p => (p.active ? 1 : 0.25)};
    transition: opacity 0.2s;

    path {
      fill: var(--color-primary);
    }
  }
`
