import React from 'react'
import PageLayout from '../components/base/layout/PageLayout'
import ScrollToTopButton from '../components/ScrollToTopButton'
import ShareCollection from '../components/collection/ShareCollection'

const ShareCollectionPage = () => {
  return (
    <PageLayout>
      <ShareCollection />
      <ScrollToTopButton />
    </PageLayout>
  )
}

export default ShareCollectionPage
