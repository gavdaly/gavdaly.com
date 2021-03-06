import React from 'react'
import styled from '@emotion/styled'

import Image from '../../components/Image'

import { IAuthor } from '../../types'

import SocialLinks from '../../components/SocialLinks'

interface AuthorHeroProps {
  author: IAuthor
}

const AuthorHero: React.FC<AuthorHeroProps> = ({ author }) => {
  return (
    <Hero>
      <HeroImage>
        <Image src={author.avatar.large} />
      </HeroImage>
      <Heading>{author.name}</Heading>
      <Subheading>{author.bio}</Subheading>
      <Social>
        <SocialLinks links={author.social} />
      </Social>
    </Hero>
  )
}

export default AuthorHero

const Hero = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 35px auto 110px;
`

const HeroImage = styled.div`
  position: relative;
  z-index: 1;
  height: 164px;
  width: 164px;
  margin-bottom: 35px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--color-background);
  box-shadow: 0px 15.619px 31.2381px rgba(0, 0, 0, 0.15);

  @media (max-width: 44em) {
    width: 146px;
    height: 146px;
  }

  @media (max-width: 44em) {
    width: 136px;
    height: 136px;
    margin-bottom: 25px;
  }
`

const Heading = styled.h1`
  font-size: 38px;
  color: var(--color-primary);
  margin-bottom: 15px;
  font-weight: 600;
`

const Subheading = styled.p`
  margin: 0 auto;
  color: var(--color-grey);
  font-size: 18px;
  line-height: 1.4;
  text-align: center;
`

const Social = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
`
