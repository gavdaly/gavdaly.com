import React, { useState } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import styled from '@emotion/styled'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import theme from 'prism-react-renderer/themes/oceanicNext'

import Icons from '../../icons'

interface CopyProps {
  toCopy: string
}

const Copy: React.FC<CopyProps> = ({ toCopy }) => {
  const [hasCopied, setHasCopied] = useState<boolean>(false)

  function copyToClipboardOnClick() {
    if (hasCopied) return
    ;(async () => {
      await navigator.clipboard.writeText(toCopy)
    })()
    setHasCopied(true)

    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }

  return (
    <CopyButton onClick={copyToClipboardOnClick}>
      {hasCopied ? (
        <>
          Copied <Icons.Copied />
        </>
      ) : (
        <>
          Copy <Icons.Copy />
        </>
      )}
    </CopyButton>
  )
}

const RE = /{([\d,-]+)}/

function calculateLinesToHighlight(meta: string) {
  if (RE.test(meta)) {
    if (!meta) return
    const lineNumbers = RE.exec(meta)[1]
    if (!lineNumbers) return
    lineNumbers.split(',').map(v => v.split('-').map(y => parseInt(y, 10)))

    return index => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start,
      )
      return inRange
    }
  } else {
    return () => false
  }
}

interface CodePrismProps {
  codeString: string
  language: Language
  metastring?: string
}

const CodePrism: React.FC<CodePrismProps> = ({ codeString, language, metastring, ...props }) => {
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  if (props['live']) {
    return (
      <Container>
        <LiveProvider code={codeString} noInline={true} theme={theme}>
          <LiveEditor style={{ marginBottom: '3px', borderRadius: '2px' }} />
          <LivePreview style={{ fontSize: '18px', borderRadius: '2px' }} />
          <LiveError style={{ color: 'tomato' }} />
        </LiveProvider>
      </Container>
    )
  } else {
    return (
      <Highlight {...defaultProps} code={codeString} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => {
          return (
            <div style={{ overflow: 'auto' }}>
              <pre className={className} style={{ position: 'relative' }}>
                <Copy toCopy={codeString} />
                {tokens.map((line, index) => {
                  const { className } = getLineProps({
                    line,
                    key: index,
                    className: shouldHighlightLine(index) ? 'highlight-line' : '',
                  })

                  return (
                    <div key={index} className={className}>
                      <span className="number-line">{index + 1}</span>
                      {line.map((token, key) => {
                        const { className, children } = getTokenProps({
                          token,
                          key,
                        })

                        return (
                          <span key={key} className={className}>
                            {children}
                          </span>
                        )
                      })}
                    </div>
                  )
                })}
              </pre>
            </div>
          )
        }}
      </Highlight>
    )
  }
}

export default CodePrism

const CopyButton = styled.button`
  position: absolute;
  right: 22px;
  top: 24px;
  padding: 8px 12px 7px;
  border-radius: 5px;
  color: #6f7177;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.07);
  }

  &:focus::after {
    content: '';
    position: absolute;
    left: -2%;
    top: -2%;
    width: 104%;
    height: 104%;
    border: 2px solid var(--color-accent);
    border-radius: 5px;
  }
`

const Container = styled.div`
  overflow: scroll;
  border-radius: 5px;

  textarea,
  pre {
    padding: 32px !important;
  }
`
