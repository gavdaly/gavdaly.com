import React, { useContext, useEffect } from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import Headings from '../../components/Headings'
import Image, { ImagePlaceholder } from '../../components/Image'

import { IArticle } from '../../types'

import { GridLayoutContext } from './Articles.List.Context'

/**
 * Tiles
 * [LONG], [SHORT]
 * [SHORT], [LONG]
 * [LONG], [SHORT]
 * [SHORT], [LONG]
 *
 * or ------------
 *
 * Rows
 * [LONG]
 * [LONG]
 * [LONG]
 */

interface ArticlesListProps {
  articles: IArticle[]
  alwaysShowAllDetails?: boolean
}

interface ArticlesListItemProps {
  article: IArticle
  narrow?: boolean
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles, alwaysShowAllDetails }) => {
  if (!articles) return null

  const hasOnlyOneArticle = articles.length === 1
  const { gridLayout = 'tiles', hasSetGridLayout, getGridLayout } = useContext(GridLayoutContext)

  /**
   * We're taking the flat array of articles [{}, {}, {}...]
   * and turning it into an array of pairs of articles [[{}, {}], [{}, {}], [{}, {}]...]
   * This makes it simpler to create the grid we want
   */

  // In the future switch to index + 1 % 4, 1 & 0 --> long, 2,3 --> short
  const articlePairs = articles.reduce((result, _value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2))
    }
    return result
  }, [])

  useEffect(() => getGridLayout(), [])

  return (
    <ArticlesListContainer hasSetGridLayout={hasSetGridLayout} alwaysShowAllDetails={alwaysShowAllDetails}>
      {articlePairs.map((ap, index) => {
        const isEven = index % 2 !== 0
        const isOdd = index % 2 !== 1

        return (
          <List key={index} gridLayout={gridLayout} hasOnlyOneArticle={hasOnlyOneArticle} reverse={isEven}>
            <ListItem article={ap[0]} narrow={isEven} />
            <ListItem article={ap[1]} narrow={isOdd} />
          </List>
        )
      })}
    </ArticlesListContainer>
  )
}

export default ArticlesList

const ListItem: React.FC<ArticlesListItemProps> = ({ article, narrow }) => {
  if (!article) return null

  const { gridLayout } = useContext(GridLayoutContext)
  const hasOverflow = narrow && article.title.length > 35
  const imageSource = narrow ? article.hero.narrow : article.hero.regular
  const hasHeroImage = imageSource && Object.keys(imageSource).length !== 0 && imageSource.constructor === Object

  return (
    <ArticleLink to={article.slug} data-a11y="false">
      <Item gridLayout={gridLayout}>
        <ImageContainer narrow={narrow} gridLayout={gridLayout}>
          {hasHeroImage ? <Image src={imageSource} /> : <ImagePlaceholder />}
        </ImageContainer>
        <div>
          <Title dark hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.title}
          </Title>
          <Excerpt narrow={narrow} hasOverflow={hasOverflow} gridLayout={gridLayout}>
            {article.excerpt}
          </Excerpt>
          <MetaData>
            {article.date} · {article.timeToRead} min read
          </MetaData>
        </div>
      </Item>
    </ArticleLink>
  )
}

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
`

const showDetails = css`
  p {
    display: -webkit-box;
  }

  h2 {
    margin-bottom: 10px;
  }
`

const ArticlesListContainer = styled.div<{ alwaysShowAllDetails?: boolean; hasSetGridLayout?: boolean }>`
  opacity: ${p => (p.hasSetGridLayout ? 1 : 0)};
  transition: opacity 0.25s;
  ${p => p.alwaysShowAllDetails && showDetails};
`

const listTile = p => css`
  position: relative;
  display: grid;
  grid-template-columns: ${p.reverse ? `100fr 162fr` : `162fr 100fr`};
  grid-template-rows: 2;
  column-gap: 30px;

  @media (max-width: 80rem) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 46rem) {
    grid-template-columns: 1fr;

    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
`

const listItemRow = css`
  display: grid;

  grid-template-columns: 100fr 162fr;
  grid-column-gap: 6rem;

  align-items: center;

  margin-bottom: 50px;

  @media (max-width: 67rem) {
    grid-column-gap: 24px;
    grid-template-columns: 1fr 380px;
  }

  @media (max-width: 46rem) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 34rem) {
    background: var(--color-background);

    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`

const listItemTile = css`
  position: relative;

  @media (max-width: 34rem) {
    background: var(--color-card);

    margin-bottom: 40px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`

// If only 1 article, dont create 2 rows.
const listRow = p => css`
  display: grid;
  grid-template-rows: ${p.hasOnlyOneArticle ? '1fr' : '1fr 1fr'};
`

const List = styled.div<{
  reverse: boolean
  gridLayout: string
  hasOnlyOneArticle: boolean
}>`
  ${p => (p.gridLayout === 'tiles' ? listTile : listRow)}
`

const Item = styled.div<{ gridLayout: string }>`
  ${p => (p.gridLayout === 'rows' ? listItemRow : listItemTile)}
`

const ImageContainer = styled.div<{ narrow: boolean; gridLayout: string }>`
  position: relative;
  height: ${p => (p.gridLayout === 'tiles' ? '280px' : '220px')};
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, ${p => (p.narrow ? 0.22 : 0.3)}),
    0 18px 36px -18px rgba(0, 0, 0, ${p => (p.narrow ? 0.25 : 0.33)});
  margin-bottom: ${p => (p.gridLayout === 'tiles' ? '30px' : 0)};
  transition: transform 0.3s var(--ease-out-quad), box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }

  @media (max-width: 46rem) {
    height: 200px;
    margin-bottom: 35px;
  }

  @media (max-width: 34rem) {
    overflow: hidden;
    margin-bottom: 0;
    box-shadow: none;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
`

const Title = styled(Headings.h2)`
  font-size: 21px;
  margin-bottom: ${p => (p.hasOverflow && p.gridLayout === 'tiles' ? '35px' : '10px')};
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};
`

const Excerpt = styled.p`
  ${limitToTwoLines}
  font-size: 16px;
  margin-bottom: 10px;

  @media (max-width: 34rem) {
    padding: 0 20px;
    margin-bottom: 20px;
    -webkit-line-clamp: 3;
  }
`

const MetaData = styled.div`
  font-weight: 300;
  font-size: 16px;

  @media (max-width: 34rem) {
    padding: 0 20px 30px;
  }
`

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-radius: 5px;
  z-index: 1;
  color: var(--color-primary);
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${ImageContainer}, &:focus ${ImageContainer} {
    transform: translateY(-1px);
    box-shadow: 0 50px 80px -20px rgba(0, 0, 0, 0.27), 0 30px 50px -30px rgba(0, 0, 0, 0.3);
  }

  &:hover h2,
  &:focus h2 {
    color: var(--color-accent);
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -1.5%;
    top: -2%;
    width: 103%;
    height: 104%;
    border: 3px solid var(--color-accent);
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  @media (max-width: 34rem) {
    &:hover ${ImageContainer} {
      transform: none;
      box-shadow: initial;
    }

    &:active {
      transform: scale(0.97) translateY(3px);
    }
  }
`
