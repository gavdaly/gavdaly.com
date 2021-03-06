import React from 'react'
import styled from '@emotion/styled'

import Icons from '../icons'

interface SocialLinksProps {
  links: {
    name: string
    url: string
  }[]
}

interface iconData {
  [key: string]: React.FC
}

const icons: iconData = {
  behance: Icons.Behance,
  dribbble: Icons.Dribbble,
  linkedin: Icons.LinkedIn,
  twitter: Icons.Twitter,
  facebook: Icons.Facebook,
  instagram: Icons.Instagram,
  github: Icons.Github,
  stackoverflow: Icons.Stackoverflow,
  youtube: Icons.YouTube,
  medium: Icons.Medium,
  unsplash: Icons.Unsplash,
  patreon: Icons.Patreon,
  paypal: Icons.Paypal,
  digitalocean: Icons.DigitalOcean,
}

const getHostname = (url: string): string => {
  return new URL(url.toLowerCase()).hostname.replace('www.', '').split('.')[0]
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  if (!links) return null

  return (
    <>
      {links.map(option => {
        const name = option.name || getHostname(option.url)
        const Icon = icons[name]
        if (!Icon) {
          throw new Error(`unsupported social link name=${name} / url=${option.url}`)
        }
        return (
          <SocialIconContainer
            key={option.url}
            target="_blank"
            rel="noopener nofollow"
            aria-label={`Link to ${option.url}`}
            href={option.url}
          >
            <Icon />
            <Hidden>Link to ${option.url}</Hidden>
          </SocialIconContainer>
        )
      })}
    </>
  )
}

export default SocialLinks

const SocialIconContainer = styled.a`
  position: relative;
  margin-left: 3.2rem;
  text-decoration: none;
  svg {
    fill: var(--color-primary);
    transition: fill, scale 0.25s var(--ease-in-out-quad);

    &:hover * {
      fill: var(--color-accent);
      transform: scale(1.1);
    }
    * {
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  &:focus::after {
    content: '';
    position: absolute;
    left: -50%;
    top: -20%;
    width: 200%;
    height: 160%;
    border: 2px solid var(--color-accent);
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }
`

const Hidden = styled.span`
  width: 0px;
  height: 0px;
  visibility: hidden;
  opacity: 0;
  overflow: hidden;
  display: inline-block;
`
