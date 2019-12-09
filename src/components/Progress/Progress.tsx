import React, { useEffect, useState } from 'react'
import throttle from 'lodash/throttle'

import { clamp } from '@utils'

export interface IProgress {
  contentHeight: number
}

const Progress: React.FC<IProgress> = ({ contentHeight }) => {
  const height = useProgress(contentHeight)

  return (
    <svg
      id="progress"
      xmlns="http://www.w3.org/2000/svg"
      height={'calc(88vh - 80px)'}
      width="2px"
      style={{
        backgroundColor: 'var(--color-track)',
        opacity: 0.6,
        overflow: 'hidden',
      }}
    >
      <rect width="2px" height={height + '%'} color={'var(--color-progress)'} />
    </svg>
  )
}

export default Progress

function useProgress(contentHeight: number) {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const percentComplete = (window.scrollY / contentHeight) * 100

      setProgress(clamp(+percentComplete.toFixed(2), -2, 104))
    }, 20)

    if (contentHeight) {
      window.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleScroll)
      return () => {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [contentHeight])

  return progress
}
