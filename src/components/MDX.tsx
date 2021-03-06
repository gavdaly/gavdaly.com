import React from 'react'

import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'

import styled from '@emotion/styled'
import { css } from '@emotion/core'

import Anchor from '../components/Anchor'
import Blockquote from '../components/Blockquote'
import Code from '../components/Code'
import Headings from '../components/Headings'
import HorizontalRule from '../components/HorizontalRule'
import Lists from '../components/Lists'
import Paragraph from '../components/Paragraph'
import Tables from '../components/Tables'
import { ImageZoom } from '../components/Image'
import Figcaption from '../components/Figcaption'

import { toKebabCase } from '../utils'

const components = {
  img: ImageZoom,
  a: Anchor,
  blockquote: Blockquote,
  h1: Headings.h2, // h1 reserved article title
  h2: Headings.h2,
  h3: Headings.h3,
  h4: Headings.h4,
  h5: Headings.h5,
  h6: Headings.h6,
  hr: HorizontalRule,
  ul: Lists.ul,
  ol: Lists.ol,
  p: Paragraph,
  code: Code.Prism,
  pre: Code.Pre,
  table: Tables.Table,
  thead: Tables.Head,
  th: Tables.HeadCell,
  td: Tables.Cell,
  figcaption: Figcaption,
}

interface MDXProps {
  content: React.ReactNode | any
}

const MDX: React.FC<MDXProps> = ({ content, children, ...props }) => {
  return (
    <MDXProvider components={components}>
      <MDXBody>
        <MDXRenderer {...props}>{content}</MDXRenderer>
        {children}
      </MDXBody>
    </MDXProvider>
  )
}

export default MDX

const HeadingsCSS = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0 auto;
  }

  h1,
  h1 *,
  h2,
  h2 * {
    margin: 25px auto 18px;
  }

  h3,
  h3 * {
    margin: 20px auto 10px;
  }
`

const prism: { [key: string]: string } = {
  token: `#fff`,
  languageJavascript: `#e8696b`,
  javascript: `#e8696b`,
  background: `#292c34`,
  comment: `#5e6a76`,
  string: `#a8e2a8`,
  var: `#b3bac5`,
  number: `#e4854d`,
  constant: `#b3bac5`,
  plain: `#fff`,
  doctype: `#e8696b`,
  tag: `#e8696b`,
  keyword: `#d49fd4`,
  boolean: `#ff5874`,
  function: `#5F8DC3`,
  parameter: `#F9965D`,
  className: `#ffcf74`,
  attrName: `#bf87ba`,
  attrValue: `#a8e2a8`,
  interpolation: `#fff`,
  punctuation: `#5FA8AA`,
  ['maybe-class-name']: `#fff`,
  property: `#80cbc4`,
  propertyAccess: `#fff`,
  namespace: `#b2ccd6`,
  highlight: `rgba(255,255,255,0.07)`,
  highlightBorder: `#e1bde2`,
  dom: `#5F8DC3`,
  operator: `#5FA8AA`,
}

const PrismCSS = css`
  .prism-code {
    overflow: auto;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;

    margin: 1rem auto 3rem;
    border-radius: 0.3rem;
    background: ${prism.background};

    .token-line {
      border-left: 3px solid transparent;

      ${Object.keys(prism)
        .map(key => {
          return `.${toKebabCase(key)}{color:${prism[key]};}`
        })
        .reduce((curr, next) => curr + next, ``)};

      & > span {
      }
    }

    .number-line {
      display: inline-block;
      width: 32px;
      user-select: none;
      opacity: 0.3;
      color: #dcd9e6;
    }

    .token-line.highlight-line {
      margin: 0 -32px;
      padding: 0 32px;
      background: ${prism.highlight};
      border-left: 3px solid ${prism.highlightBorder};
    }

    .operator + .maybe-class-name {
      color: #ffcf74 !important;
    }

    .plain ~ .operator {
      color: #5fa8aa !important;
    }
  }
`

const ImageCSS = css`
  .gatsby-resp-image-background-image {
    display: none !important;
  }

  img {
    display: inline-block;
    position: relative;
    max-width: 100%;
    height: auto;
    z-index: 0;
    margin: 15px auto 50px;
    border-radius: 5px;
  }

  div.Image__Small {
    max-width: 100%;
    height: auto;
    z-index: 0;

    border-radius: 5px;
    width: 100%;
  }

  .Image__Container {
    text-align: center;
  }

  img.Image__With-Shadow {
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
  }

  div.Image__Medium {
    width: 100%;
  }

  div.Image__Large {
    pointer-events: none;

    img {
      border-radius: 0;
    }
  }
`

/**
 * MDXBody
 * Here we're applying "global" selectors to make sure we maintain an article
 * body type feel. We're also applying all the Prism selecotors and styles within
 * the MDXBody.
 */
const MDXBody = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  flex-direction: column;

  ${HeadingsCSS}
  ${PrismCSS}
  ${ImageCSS}
`
