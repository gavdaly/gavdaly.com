import React, { useState } from 'react'
import styled from '@emotion/styled'
import OutsideClickHandler from 'react-outside-click-handler'
import { Link } from 'gatsby'

import Image from '../../components/Image'
import Icons from '../../icons'
import { IAuthor } from '../../types'

/**
 * When generating the author names we're also checking to see how long the
 * number of authors are. If it's only 2 authors we'll show the fullnames.
 * Otherwise it'll only preview the first names of each author.
 */
function generateAuthorNames(authors: IAuthor[]) {
  return authors
    .map(author => {
      if (authors.length > 2) {
        return author.name.split(' ')[0]
      } else {
        return author.name
      }
    })
    .join(', ')
}

interface AuthorsProps {
  authors: IAuthor[]
}

const CoAuthors: React.FC<AuthorsProps> = ({ authors }) => {
  const [isOpen, setIsOpen] = useState(false)
  const names = generateAuthorNames(authors)

  const listWidth = { width: `${10 + authors.length * 15}px` }

  return (
    <CoAuthorsContainer onClick={() => setIsOpen(!isOpen)} isOpen={isOpen}>
      <CoAuthorsList style={listWidth}>
        {authors.map((author, index) => (
          <CoAuthorAvatar style={{ left: `${index * 15}px` }} key={author.name}>
            <Image src={author.avatar.small} />
          </CoAuthorAvatar>
        ))}
      </CoAuthorsList>
      <NameContainer>{names}</NameContainer>
      <IconContainer>
        <Icons.ToggleOpen />
      </IconContainer>

      {isOpen && (
        <OutsideClickHandler onOutsideClick={() => setIsOpen(!isOpen)}>
          <CoAuthorsListOpen>
            <IconOpenContainer>
              <Icons.ToggleClose fill={fill} />
            </IconOpenContainer>
            {authors.map(author => (
              <CoAuthorsListItemOpen key={author.name}>
                <AuthorLink as={author.authorsPage ? Link : 'div'} to={author.slug}>
                  <CoAuthorAvatarOpen>
                    <Image src={author.avatar.small} />
                  </CoAuthorAvatarOpen>
                  <AuthorNameOpen>{author.name}</AuthorNameOpen>
                </AuthorLink>
              </CoAuthorsListItemOpen>
            ))}
          </CoAuthorsListOpen>
        </OutsideClickHandler>
      )}
    </CoAuthorsContainer>
  )
}

/**
 * Novela supports multiple authors and therefore we need to ensure
 * we render the right UI when there are varying amount of authors.
 */
const ArticleAuthors: React.FC<AuthorsProps> = ({ authors }) => {
  const hasCoAuthors = authors.length > 1

  // Special dropdown UI for multiple authors
  if (hasCoAuthors) {
    return <CoAuthors authors={authors} />
  } else {
    return (
      <AuthorLink as={authors[0].authorsPage ? Link : 'div'} to={authors[0].slug}>
        <AuthorAvatar>
          <Image src={authors[0].avatar.small} />
        </AuthorAvatar>
        <strong>{authors[0].name}</strong>
        <HideOnMobile>,&nbsp;</HideOnMobile>
      </AuthorLink>
    )
  }
}

export default ArticleAuthors

const AuthorAvatar = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 14px;
  background: var(--color-grey);
  overflow: hidden;

  .gatsby-image-wrapper > div {
    padding-bottom: 100% !important;
  }

  @media (max-width: 44em) {
    display: none;
  }
`

const AuthorLink = styled.div`
  display: flex;
  align-items: center;
  color: inherit;

  strong {
    transition: background 0.25s var(--ease-in-out-quad), color 0.25s var(--ease-in-out-quad);
  }

  &:hover strong {
    color: var(--color-primary);
  }
`

const CoAuthorsList = styled.div`
  position: relative;
  height: 25px;
  margin-right: 15px;

  @media (max-width: 44em) {
    display: none;
  }
`

const CoAuthorsListOpen = styled.ul`
  position: absolute;
  z-index: 2;
  left: -21px;
  right: -21px;
  top: -19px;
  padding: 21px;
  background: var(--color-card);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  cursor: pointer;
  list-style: none;
  transform: translateY(-2px);
`

const CoAuthorsListItemOpen = styled.li`
  a {
    width: 100%;
  }

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`

const CoAuthorAvatarOpen = styled.div`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  margin-right: 15px;
  background: var(--color-grey);
  overflow: hidden;
  pointer-events: none;

  .gatsby-image-wrapper > div {
    padding-bottom: 100% !important;
    overflow: hidden;
  }
`

const CoAuthorAvatar = styled.div`
  position: absolute;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  z-index: 1;
  background: var(--color-grey);
  box-shadow: 0 0 0 2px var(--color-background);
  transition: box-shadow 0.25s ease;
  overflow: hidden;
  pointer-events: none;

  .gatsby-image-wrapper > div {
    padding-bottom: 100% !important;
    overflow: hidden;
  }

  @media (max-width: 44em) {
    display: none;
  }
`

const NameContainer = styled.strong`
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  cursor: pointer;
`

const AuthorNameOpen = styled.strong`
  position: relative;
  cursor: pointer;
  color: var(--color-secondary);
  font-weight: 600;
`

const IconContainer = styled.div`
  position: relative;
  cursor: pointer;
  margin-left: 10px;

  @media (max-width: 44em) {
    position: absolute;
    right: 0;
    bottom: 0;
    top: 10px;
    height: 100%;
  }
`

const IconOpenContainer = styled.div`
  position: absolute;
  cursor: pointer;
  top: 20px;
  right: 21px;
`

const CoAuthorsContainer = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: var(--color-grey);
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    left: -20px;
    right: -20px;
    top: -16px;
    bottom: -16px;
    background: var(--color-card);
    box-shadow: ${p => (p.isOpen ? 'none' : ' 0px 0px 15px rgba(0, 0, 0, 0.1)')};
    border-radius: 5px;
    z-index: 0;
    transition: opacity 0.3s;
    cursor: pointer;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 44em) {
    font-size: 14px;
    align-items: center;

    &::before {
      box-shadow: none;
      bottom: -30px;
      background: transparent;
    }

    strong {
      display: block;
      font-weight: semi-bold;
      margin-bottom: 5px;
    }
  }
`

const HideOnMobile = styled.span`
  @media (max-width: 44em) {
    display: none;
  }
`
