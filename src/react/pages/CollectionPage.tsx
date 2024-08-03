import React from 'react'
import Collection from '../components/collection/Collection'
import ScrollToTopButton from '../components/ScrollToTopButton'
import PageLayout from '../components/base/layout/PageLayout'

const CollectionPage = () => {
  return (
    <PageLayout>
      <Collection />
      <ScrollToTopButton />
    </PageLayout>
  )
}

export default CollectionPage
