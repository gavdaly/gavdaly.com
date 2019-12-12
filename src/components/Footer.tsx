import React from 'react'
import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'

import SocialLinks from '../components/SocialLinks'

const siteQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            name
            social {
              url
              name
            }
          }
        }
      }
    }
    allMdx(sort: { fields: frontmatter___date, order: ASC }, filter: { frontmatter: { date: { ne: null } } }) {
      edges {
        node {
          frontmatter {
            date
          }
        }
      }
    }
  }
`

const Footer: React.FC<{}> = () => {
  const results = useStaticQuery(siteQuery)
  const { name, social } = results.allSite.edges[0].node.siteMetadata

  const copyrightDate = (() => {
    const { edges } = results.allMdx
    const years = [0, edges.length - 1].map(edge => new Date(edges[edge].node.frontmatter.date).getFullYear())
    return years[0] === years[1] ? `${years[0]}` : `${years[0]}–${years[1]}`
  })()

  return (
    <FooterContainer id="footer">
      <div style={{ fontSize: '0.6rem' }}>
        © {copyrightDate} {name}
      </div>
      <div>
        <SocialLinks links={social} />
      </div>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  align-items: baseline;
  color: var(--color-primary);
  @media (min-width: 44rem) {
    flex-direction: row;
    justify-content: space-between;
  }
`
