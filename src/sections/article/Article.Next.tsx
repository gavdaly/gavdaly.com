import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import Headings from '../../components/Headings'
import Image from '../../components/Image'

import { IArticle } from '../../types'

interface ArticlesNextProps {
  articles: IArticle[]
}

/**
 * Sits at the bottom of our Article page. Shows the next 2 on desktop and the
 * next 1 on mobile!
 *
 *  [..............], [.........]
 *  [.....LONG.....], [..SHORT..]
 *  [..............], [.........]
 *
 * This does NOT use Articles.List because there's a special case of only have 1 article
 * as the next one suggested article, which requires special styling we didn't want to
 * mix into the generic list component.
 */
const ArticlesNext: React.FC<ArticlesNextProps> = ({ articles }) => {
  if (!articles) return null
  const numberOfArticles = articles.length
  return (
    <Grid numberOfArticles={numberOfArticles}>
      <GridItem article={articles[0]} />
      <GridItem article={articles[1]} narrow />
    </Grid>
  )
}

export default ArticlesNext

interface GridItemProps {
  article: IArticle
  narrow?: boolean
}

const GridItem: React.FC<GridItemProps> = ({ article }) => {
  if (!article) return null

  const imageSource = article.hero.regular

  return (
    <ArticleLink to={article.slug} data-a11y="false">
      <Item>
        <ImageContainer>
          <Image src={imageSource} />
        </ImageContainer>
        <Title>{article.title}</Title>
        <Excerpt>{article.excerpt}</Excerpt>
        <MetaData>
          {article.date} · {article.timeToRead} min read
        </MetaData>{' '}
      </Item>
    </ArticleLink>
  )
}

const wide = '1fr'
const narrow = '457px'

const limitToTwoLines = css`
  text-overflow: ellipsis;
  overflow-wrap: normal;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  white-space: normal;
  overflow: hidden;
`
const Grid = styled.div<{ numberOfArticles: number }>`
  position: relative;
  display: grid;
  ${p => {
    if (p.numberOfArticles === 1) {
      return `
      grid-template-columns: 1fr;
      grid-template-rows: 1
    `
    } else {
      return `
      grid-template-columns: ${wide} ${narrow};
      grid-template-rows: 2;
      `
    }
  }}
  column-gap: 30px;
  margin: 0 auto;
  max-width: ${p => (p.numberOfArticles === 1 ? '680px' : '100%')};
`

const ImageContainer = styled.div`
  position: relative;
  height: 280px;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.22), 0 18px 36px -18px rgba(0, 0, 0, 0.25);
  margin-bottom: 30px;
  transition: transform 0.3s var(--ease-out-quad), box-shadow 0.3s var(--ease-out-quad);

  & > div {
    height: 100%;
  }
`

const Item = styled.div`
  position: relative;

  @media (max-width: 540px) {
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background: var(--color-card);
  }
`

const Title = styled(Headings.h3)`
  font-size: 22px;
  line-height: 1.4;
  margin-bottom: 1rem;
  color: var(--color-primary);
  transition: color 0.3s ease-in-out;
  ${limitToTwoLines};
`

const Excerpt = styled.p`
  ${limitToTwoLines};
  font-size: 16px;
  margin-bottom: 10px;
  color: var(--color-grey);
`

const MetaData = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: var(--color-grey);
  opacity: 0.33;
`

const ArticleLink = styled(Link)`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.33s var(--ease-out-quart);
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);

  &:hover ${ImageContainer} {
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
    left: -2%;
    top: -2%;
    width: 104%;
    height: 104%;
    border: 3px solid var(--color-accent);
    background: rgba(255, 255, 255, 0.01);
  }
`
