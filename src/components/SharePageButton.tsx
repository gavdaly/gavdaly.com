import React from 'react'
import Icons from '../icons'

import { IconWrapper } from '../components/IconWrapper'
import { ToolTip } from './ToolTip'
import { useCopyToClipboard, copyState } from './useCopyToClipboard'

export const SharePageButton: React.FC<{}> = () => {
  const [hasCopied, copy] = useCopyToClipboard()
  const text = window.location.href

  return (
    <>
      <IconWrapper onClick={() => copy(text)} aria-label="Copy URL to clipboard" title="Copy URL to clipboard">
        <Icons.Link />
        <ToolTip className={hasCopied === copyState.copied ? 'copied' : ''}>Copied</ToolTip>
      </IconWrapper>
    </>
  )
}
