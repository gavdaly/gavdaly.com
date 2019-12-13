import { useState } from 'react'

export enum copyState {
  waiting,
  copied,
}

export function useCopyToClipboard(): [copyState, (_: string) => void] {
  const [hasCopied, setHasCopied] = useState<copyState>(copyState.waiting)
  function copy(text: string) {
    if (hasCopied === copyState.copied) return
    ;(async () => {
      await navigator.clipboard.writeText(text)
    })()
    setHasCopied(copyState.copied)
    setTimeout(() => {
      setHasCopied(copyState.waiting)
    }, 1000)
  }
  return [hasCopied, copy]
}
