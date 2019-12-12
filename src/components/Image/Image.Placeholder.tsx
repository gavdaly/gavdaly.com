import React, { useRef, useEffect, useState } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #ccc;
  color: #898989;
  font-size: 32px;
  font-weight: 600;
`
const initialProps = { width: 0, height: 0 }

const ImagePlaceholder: React.FC = props => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState(initialProps)

  useEffect(() => {
    if (!containerRef) return
    if (!containerRef.current) return

    setDimensions(containerRef.current.getBoundingClientRect())

    const handleResize = () => {
      if (!containerRef) return
      if (!containerRef.current) return

      setDimensions(containerRef.current.getBoundingClientRect())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Container ref={containerRef} {...props}>
      {dimensions.width} x {dimensions.height}
    </Container>
  )
}

export default ImagePlaceholder
