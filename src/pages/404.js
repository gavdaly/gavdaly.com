import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Headings from '../components/Headings'

function NotFoundPage() {
  return (
    <Layout>
      <SEO />
      <Headings.h1>404: Page Not Found</Headings.h1>
    </Layout>
  )
}

export default NotFoundPage
