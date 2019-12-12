import React, { useRef, useState, useEffect, RefObject } from 'react'
import styled from '@emotion/styled'
import throttle from 'lodash/throttle'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/Layout'
import MDXRenderer from '../components/MDX'
import Progress from '../components/Progress'
import Subscription from '../components/Subscription'

import { debounce, clamp } from '../utils'

import ArticleHero from '../sections/article/Article.Hero'
import ArticlesNext from '../sections/article/Article.Next'
import ArticleSEO from '../sections/article/Article.SEO'
import ArticleShare from '../sections/article/Article.Share'

import { Template } from '../types'

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
          }
        }
      }
    }
  }
`

const useHeightPercent = (ref: RefObject<HTMLElement>): number => {
  const [hasCalculated, setHasCalculated] = useState<boolean>(false)
  const [contentHeight, setContentHeight] = useState<number>(0)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const calculateBodySize = throttle(() => {
      const contentSection = ref.current

      if (!contentSection) return

      /**
       * If we haven't checked the content's height before,
       * we want to add listeners to the content area's
       * imagery to recheck when it's loaded
       */
      if (!hasCalculated) {
        const debouncedCalculation = debounce(calculateBodySize)
        const $imgs = contentSection.querySelectorAll('img')

        $imgs.forEach($img => {
          // If the image hasn't finished loading then add a listener
          if (!$img.complete) $img.onload = debouncedCalculation
        })

        // Prevent rerun of the listener attachment
        setHasCalculated(true)
      }

      // Set the height and offset of the content area
      setContentHeight(contentSection.getBoundingClientRect().height)
    }, 20)

    calculateBodySize()
    window.addEventListener('resize', calculateBodySize)

    return () => window.removeEventListener('resize', calculateBodySize)
  }, [])

  useEffect(() => {
    console.log(`Content Height: `, contentHeight)
    const handleScroll = throttle(() => {
      const percentComplete = (window.scrollY / contentHeight) * 100

      setProgress(clamp(+percentComplete.toFixed(2), -2, 104))
    }, 20)

    if (contentHeight) {
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [contentHeight])

  return progress
}

const Article: Template = ({ pageContext, location }) => {
  const contentSectionRef = useRef<HTMLElement>(null)
  const contentHeight = useHeightPercent(contentSectionRef)

  const results = useStaticQuery(siteQuery)
  const name = results.allSite.edges[0].node.siteMetadata.name

  const { article, authors, mailchimp, next } = pageContext

  return (
    <>
      <ArticleSEO article={article} authors={authors} location={location} />
      <Layout>
        <ArticleHero article={article} authors={authors} />
        <ArticleBody ref={contentSectionRef}>
          <MDXRenderer content={article.body}>
            <ArticleShare />
          </MDXRenderer>
        </ArticleBody>
        {mailchimp && article.subscription && <Subscription />}
        {next.length > 0 && (
          <NextArticle>
            <FooterNext>More articles from {name}</FooterNext>
            <ArticlesNext articles={next} />
          </NextArticle>
        )}
      </Layout>
      <Progress percentComplete={contentHeight} />
    </>
  )
}

export default Article

const ArticleBody = styled.article`
  transition: background 0.2s linear;
`

const NextArticle = styled.section`
  display: block;
`

const FooterNext = styled.h3`
  margin-bottom: 100px;
  font-weight: 400;
  color: var(--color-primary);
`
