import React from 'react'
import styled from '@emotion/styled'

import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Paginator from '../components/Navigation/Navigation.Paginator'

import AuthorHero from '../sections/author/Author.Hero'
import AuthorArticles from '../sections/author/Author.Articles'

import { Template } from '../types'

const ArticlesPage: Template = ({ location, pageContext }) => {
  const author = pageContext.additionalContext.author
  const articles = pageContext.group

  return (
    <Layout>
      <SEO pathname={location.pathname} title={author.name} description={author.bio} />
      <AuthorHero author={author} />
      <AuthorArticles articles={articles} />
      <AuthorPaginator>
        <Paginator {...pageContext} />
      </AuthorPaginator>
    </Layout>
  )
}

export default ArticlesPage

const AuthorPaginator = styled.div`
  text-align: center;
`
