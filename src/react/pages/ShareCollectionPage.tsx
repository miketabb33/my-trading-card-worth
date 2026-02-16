import React from 'react'
import PageLayout from '../components/base/layout/PageLayout'
import { StickyScrollNavBar, ScrollToTopButton } from '../components/sticky-scroll'
import ShareCollection from '../components/collection/ShareCollection'

const ShareCollectionPage = () => {
  return (
    <PageLayout>
      <ShareCollection />
      <StickyScrollNavBar>
        <ScrollToTopButton />
      </StickyScrollNavBar>
    </PageLayout>
  )
}

export default ShareCollectionPage
