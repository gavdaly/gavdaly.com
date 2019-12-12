import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

import Image from '../components/Image'
import { IAuthor } from '../types'

interface IProps {
  author: IAuthor
}

const Bio: React.FC<IProps> = ({ author }) => {
  console.log('AUTHOR: ', author)
  return (
    <BioContainer>
      <BioAvatar to={author.slug} data-a11y="false" aria-label="Author's bio">
        <BioAvatarInner>
          <Image src={author.avatar.medium} />
        </BioAvatarInner>
      </BioAvatar>
      <BioText dangerouslySetInnerHTML={{ __html: author.bio }} />
    </BioContainer>
  )
}

export default Bio

const BioContainer = styled.div`
  display: flex;
  align-items: center;
`

const BioAvatar = styled(Link)`
  display: block;
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  margin-right: 16px;
  margin: 10px 26px 10px 10px;

  &::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.25);
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    width: 50px;
    height: 50px;
    border: 2px solid var(--color-accent);
  }
`

const BioAvatarInner = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.25);
  overflow: hidden;
`

const BioText = styled.p`
  color: var(--color-grey);

  a {
    color: var(--color-grey);
    text-decoration: underline;
  }
`
