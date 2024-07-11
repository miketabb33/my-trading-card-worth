import React from 'react'
import { PageLayout } from '../components/Layout'
import Navigation from '../components/navigation/Navigation'
import { useMyCards } from '../network/myCardClient'
import CardList from '../components/card-list/CardList'

const CollectionPage = () => {
  const { data: myCards, refresh } = useMyCards()

  return (
    <PageLayout>
      <Navigation />
      <CardList blueprints={myCards || []} refreshBlueprints={refresh} />
    </PageLayout>
  )
}

export default CollectionPage
