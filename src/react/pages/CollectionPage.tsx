import React from 'react'
import { PageLayout } from '../components/Layout'
import Navigation from '../components/navigation/Navigation'
import Collection from '../components/collection/Collection'
import ScrollToTopButton from '../components/ScrollToTopButton'

const CollectionPage = () => {
  return (
    <PageLayout>
      <Navigation />
      <Collection />
      <ScrollToTopButton />
    </PageLayout>
  )
}

export default CollectionPage
