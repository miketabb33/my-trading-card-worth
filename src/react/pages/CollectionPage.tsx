import React from 'react'
import { PageLayout } from '../components/Layout'
import Navigation from '../components/navigation/Navigation'
import Collection from '../components/collection/Collection'

const CollectionPage = () => {
  return (
    <PageLayout>
      <Navigation />
      <Collection />
    </PageLayout>
  )
}

export default CollectionPage
