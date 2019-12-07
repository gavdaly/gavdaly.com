import React, { useState, useEffect } from "react"
import styled from "@emotion/styled"
import { Link, navigate } from "gatsby"
import { useColorMode } from "theme-ui"

import Section from "../../components/Section"
import Logo from "../../components/Logo"

import Icons from "../../icons"
import mediaqueries from "../../styles/media"
import {
  copyToClipboard,
  getWindowDimensions,
  getBreakpointFromTheme,
} from "../../utils"

import { ToolTip } from "../ToolTip"
import { DarkModeToggle } from "@components/DarkModeToggle"
import { IconWrapper } from "@components/IconWrapper"


const SharePageButton: React.FC<{}> = () => {
  const [hasCopied, setHasCopied] = useState<boolean>(false)
  const [colorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const fill = isDark ? "#fff" : "#000"

  function copyToClipboardOnClick() {
    if (hasCopied) return

    copyToClipboard(window.location.href)
    setHasCopied(true)

    setTimeout(() => {
      setHasCopied(false)
    }, 1000)
  }

  return (
    <IconWrapper
      isDark={isDark}
      onClick={copyToClipboardOnClick}
      data-a11y="false"
      aria-label="Copy URL to clipboard"
      title="Copy URL to clipboard"
    >
      <Icons.Link fill={fill} />
      <ToolTip isDark={isDark} hasCopied={hasCopied}>
        Copied
      </ToolTip>
    </IconWrapper>
  )
}

const NavigationHeader: React.FC = () => {
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false)
  const [previousPath, setPreviousPath] = useState<string>("/")

  const [colorMode] = useColorMode()
  const fill = colorMode === "dark" ? "#fff" : "#000"

  useEffect(() => {
    const { width } = getWindowDimensions()
    const phablet = getBreakpointFromTheme("phablet")

    const prev = localStorage.getItem("previousPath")
    const previousPathWasHomepage =
      prev === "/" || (prev && prev.includes("/page/"))
    const isNotPaginated = !location.pathname.includes("/page/")

    setShowBackArrow(
      previousPathWasHomepage && isNotPaginated && width <= phablet,
    )
    setPreviousPath(prev)
  }, [])

  return (
    <Section>
      <NavContainer>
        <LogoLink
          to="/"
          data-a11y="false"
          title="Navigate back to the homepage"
          aria-label="Navigate back to the homepage"
          back={showBackArrow ? "true" : "false"}
        >
          {showBackArrow && (
            <BackArrowIconContainer>
              <Icons.ChevronLeft fill={fill} />
            </BackArrowIconContainer>
          )}
          <Logo fill={fill} />
          <Hidden>Navigate back to the homepage</Hidden>
        </LogoLink>
        <NavControls>
          {showBackArrow ? (
            <button
              onClick={() => navigate(previousPath)}
              title="Navigate back to the homepage"
              aria-label="Navigate back to the homepage"
            >
              <Icons.Ex fill={fill} />
            </button>
          ) : (
              <>
                <SharePageButton />
                <DarkModeToggle />
              </>
            )}
        </NavControls>
      </NavContainer>
    </Section>
  )
}

export default NavigationHeader

const BackArrowIconContainer = styled.div`
  transition: 0.2s transform var(--ease-out-quad);
  opacity: 0;
  padding-right: 30px;
  animation: fadein 0.3s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`

const NavContainer = styled.div`
  position: relative;
  z-index: 100;
  padding-top: 100px;
  display: flex;
  justify-content: space-between;

  ${mediaqueries.desktop_medium`
    padding-top: 50px;
  `};

  @media screen and (max-height: 800px) {
    padding-top: 50px;
  }
`

const LogoLink = styled(Link) <{ back: string }>`
  position: relative;
  display: flex;
  align-items: center;
  left: ${p => (p.back === "true" ? "-54px" : 0)};

  ${mediaqueries.desktop_medium`
    left: 0
  `}

  &[data-a11y="true"]:focus::after {
    content: "";
    position: absolute;
    left: -10%;
    top: -30%;
    width: 120%;
    height: 160%;
    border: 2px solid var(--color-accent);
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  &:hover {
    ${BackArrowIconContainer} {
      transform: translateX(-3px);
    }
  }
`

const NavControls = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${mediaqueries.phablet`
    right: -5px;
  `}
`

const Hidden = styled.span`
  position: absolute;
  display: inline-block;
  opacity: 0;
  width: 0px;
  height: 0px;
  visibility: hidden;
  overflow: hidden;
`
