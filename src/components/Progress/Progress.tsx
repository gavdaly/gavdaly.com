import React from 'react'

export interface IProgress {
  percentComplete: number
}

const Progress: React.FC<IProgress> = ({ percentComplete }) => (
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
    <rect width="2px" height={percentComplete + '%'} color={'var(--color-progress)'} />
  </svg>
)

export default Progress
