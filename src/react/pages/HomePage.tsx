import React from 'react'
import { PageLayout } from '../components/Layout'
import CardCatalog from '../components/card-catalog/CardCatalog'
import Navigation from '../components/Navigation'

const HomePage = () => {
  return (
    <PageLayout>
      <Navigation />
      <CardCatalog />
    </PageLayout>
  )
}

export default HomePage
