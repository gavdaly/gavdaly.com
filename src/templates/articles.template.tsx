import React from 'react'

import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Paginator from '../components/Navigation/Navigation.Paginator'

import ArticlesHero from '../sections/articles/Articles.Hero'
import ArticlesList from '../sections/articles/Articles.List'

import { Template } from '../types'

const ArticlesPage: Template = ({ location, pageContext }) => {
  const articles = pageContext.group
  const authors = pageContext.additionalContext.authors

  return (
    <Layout>
      <SEO pathname={location.pathname} />
      <ArticlesHero authors={authors} />

      <ArticlesList articles={articles} />
      {pageContext.pageCount > 1 && <Paginator {...pageContext} />}
    </Layout>
  )
}

export default ArticlesPage
