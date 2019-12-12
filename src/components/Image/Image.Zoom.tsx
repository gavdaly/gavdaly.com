import React from 'react'
import ImageWithZoom from 'react-medium-image-zoom'

function handleImageZoomBackground(background: string) {
  const images = Array.from(document.getElementsByClassName('Image__Zoom'))

  images.map(img => {
    if (img.previousElementSibling && img.previousElementSibling.tagName === 'DIV') {
      img.previousElementSibling.style.background = background
    }
  })
}

const ImageZoom: React.FC = props => {
  const image = {
    ...props,
    className: 'Image__Zoom',
    style: {
      display: 'block',
      margin: '0 auto',
      width: '100%',
    },
  }

  return (
    <ImageWithZoom
      image={image}
      zoomImage={image}
      onZoom={() => handleImageZoomBackground('var(--color-background)')}
      defaultStyles={{
        zoomImage: {
          borderRadius: '5px',
        },
      }}
    />
  )
}

export default ImageZoom
