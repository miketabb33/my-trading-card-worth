import React from 'react'
import Collection from '../components/collection/Collection'
import { StickyScrollNavBar, ScrollToTopButton } from '../components/sticky-scroll'
import PageLayout from '../components/base/layout/PageLayout'

const CollectionPage = () => {
  return (
    <PageLayout>
      <Collection />
      <StickyScrollNavBar>
        <ScrollToTopButton />
      </StickyScrollNavBar>
    </PageLayout>
  )
}

export default CollectionPage
