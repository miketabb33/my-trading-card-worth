import React from 'react'
import { PageLayout } from '../components/Layout'
import Catalog from '../components/catalog/Catalog'
import Navigation from '../components/navigation/Navigation'
import ScrollToTopButton from '../components/ScrollToTopButton'

const CatalogPage = () => {
  return (
    <PageLayout>
      <Navigation />
      <Catalog />
      <ScrollToTopButton />
    </PageLayout>
  )
}

export default CatalogPage
