import React, { useState } from 'react'
import Icons from '../icons'

import { IconWrapper } from '@components/IconWrapper'
import { ToolTip } from './ToolTip'

enum copyState {
  waiting,
  copied,
}

export const SharePageButton: React.FC<{}> = () => {
  const [hasCopied, setHasCopied] = useState<copyState>(copyState.waiting)

  function copyToClipboardOnClick() {
    if (hasCopied === copyState.copied) return
    ;(async () => {
      await navigator.clipboard.writeText(window.location.href)
    })()

    setHasCopied(copyState.copied)

    setTimeout(() => {
      setHasCopied(copyState.waiting)
    }, 1000)
  }

  return (
    <>
      <IconWrapper
        onClick={copyToClipboardOnClick}
        data-a11y="false"
        aria-label="Copy URL to clipboard"
        title="Copy URL to clipboard"
      >
        <Icons.Link />
        <ToolTip className={hasCopied === copyState.copied ? 'copied' : ''}>Copied</ToolTip>
      </IconWrapper>
    </>
  )
}
