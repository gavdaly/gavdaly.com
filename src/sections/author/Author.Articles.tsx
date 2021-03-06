import React from 'react'
import styled from '@emotion/styled'

import { IArticle } from '@types'

import ArticlesList from '../articles/Articles.List'

interface AuthorArticlesProps {
  articles: IArticle[]
}

const AuthorArticles: React.FC<AuthorArticlesProps> = ({ articles }) => {
  return (
    <AuthorArticlesContainer>
      <ArticlesList articles={articles} alwaysShowAllDetails />
    </AuthorArticlesContainer>
  )
}

export default AuthorArticles

const AuthorArticlesContainer = styled.div`
  background: linear-gradient(180deg, var(--color-card) 0%, rgba(249, 250, 252, 0) 91.01%);
  border-radius: 8px;
  padding: 88px 98px;
  position: relative;
  z-index: 1;
`
