import React from 'react'
import { PageLayout } from '../components/Layout'
import Catalog from '../components/catalog/Catalog'
import Navigation from '../components/navigation/Navigation'

const CatalogPage = () => {
  return (
    <PageLayout>
      <Navigation />
      <Catalog />
    </PageLayout>
  )
}

export default CatalogPage
