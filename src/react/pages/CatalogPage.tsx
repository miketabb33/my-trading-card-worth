import React from 'react'
import { PageLayout } from '../components/Layout'
import CardCatalog from '../components/card-catalog/CardCatalog'
import Navigation from '../components/Navigation'

const CatalogPage = () => {
  return (
    <PageLayout>
      <Navigation />
      <CardCatalog />
    </PageLayout>
  )
}

export default CatalogPage
