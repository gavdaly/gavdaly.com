import React from 'react'
import styled from '@emotion/styled'

import Headings from '../../components/Headings'
import Image, { ImagePlaceholder } from '../../components/Image'

import { IArticle, IAuthor } from '../../types'

import ArticleAuthors from './Article.Authors'

interface ArticleHeroProps {
  article: IArticle
  authors: IAuthor[]
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ article, authors }) => {
  const hasCoAUthors = authors.length > 1
  const hasHeroImage =
    article.hero && Object.keys(article.hero.full).length !== 0 && article.hero.full.constructor === Object

  return (
    <>
      <Header>
        <HeroHeading>{article.title}</HeroHeading>
        <HeroSubtitle>
          <ArticleAuthors authors={authors} />
          <ArticleMeta>
            {article.date} · {article.timeToRead} min read
          </ArticleMeta>
        </HeroSubtitle>
      </Header>
      <HeroImage id="ArticleImage__Hero">
        {hasHeroImage ? <Image src={article.hero.full} /> : <ImagePlaceholder />}
      </HeroImage>
    </>
  )
}

export default ArticleHero

const ArticleMeta = styled.div`
  margin-left: 10px;
`

const Header = styled.header`
  z-index: 10;
`

const HeroHeading = styled(Headings.h1)`
  font-size: 48px;
  margin-bottom: 25px;
  font-weight: bold;
  line-height: 1.32;
`

const HeroSubtitle = styled.div`
  display: flex;
  font-size: 18px;
  color: var(--color-grey);

  strong {
    display: block;
    font-weight: 500;
    margin-bottom: 5px;
  }
`

const HeroImage = styled.div`
  z-index: 1;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2), 0 18px 36px -18px rgba(0, 0, 0, 0.22);
`
