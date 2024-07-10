import React from 'react'
import { PageLayout } from '../components/Layout'
import Navigation from '../components/navigation/Navigation'
import { useMyCards } from '../network/myCardClient'
import BlueprintList from '../components/BlueprintList'

const CollectionPage = () => {
  const { data: myCards, refresh } = useMyCards()

  return (
    <PageLayout>
      <Navigation />
      <BlueprintList blueprints={myCards || []} refreshBlueprints={refresh} />
    </PageLayout>
  )
}

export default CollectionPage
